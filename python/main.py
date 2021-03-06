import os
import signal
from threading import Thread
from abc import ABC, abstractmethod
from typing import Optional

from gpiozero import LED, Button
import subprocess
from firebase_admin import storage, firestore
import time


class LogEntry:
    def __init__(self, category, source, message):
        self.source = source
        self.category = category
        self.message = message
        self.timestamp = time.time()

    @property
    def dict(self):
        return {
            'source': self.source,
            'category': self.category,
            'message': self.message,
            'timestamp': self.timestamp,
        }


class Raspberry:
    def __init__(self, toggle):
        self.led = LED(14)
        self.led.off()
        self.button = Button(15)
        self.button.when_released = toggle

    def close(self):
        self.led.close()
        self.button.close()


class Stream(ABC):
    def __init__(self):
        self._running = False
        self.__thread_instance = None
        self._rtsp = None
        self._rtmp = None

    @property
    def running(self):
        return self._running

    @abstractmethod
    def _thread(self):
        pass

    def start(self, rtsp, rtmp):
        if self._running is False:
            self._running = True
            self._rtsp = rtsp
            self._rtmp = rtmp
            self.__thread_instance = Thread(target=self._thread)
            self.__thread_instance.start()

    def stop(self):
        self._running = False
        if self.__thread_instance is not None:
            self.__thread_instance.join()
            self.__thread_instance = None


class ImageStream(Stream):
    def __init__(self, interval=60):
        super().__init__()
        self.__interval = interval

    def __upload_frame(self):
        if os.path.exists('sponsor_banner.png'):
            subprocess.run(f"ffmpeg -y -i {self._rtsp} -i sponsor_banner.png "
                           f"-filter_complex 'overlay' "
                           f"-vframes 1 current.jpg", shell=True, timeout=20)
        else:
            subprocess.run(f"ffmpeg -y -i {self._rtsp} -vframes 1 current.jpg", shell=True, timeout=20)
        blob = storage.bucket('wsu-oepping.appspot.com').blob('live/current.jpg')
        blob.upload_from_filename('current.jpg')
        blob.make_public()

    def _thread(self):
        start_time = time.time()
        while self._running:
            time.sleep(1)
            if time.time() - start_time > 60:
                start_time = time.time()
                try:
                    self.__upload_frame()
                    # _log(LogEntry('info', 'Bild??bertragung', 'Bild aktualisiert'))
                except Exception as e:
                    _log(LogEntry('warning', 'Bild??bertragung', repr(e)))


class VideoStream(Stream):
    def __init__(self):
        super().__init__()

    def __open_live_stream(self):
        self.start_time = time.time()
        if os.path.exists('sponsor_banner.png'):
            command = f'ffmpeg -f lavfi -i anullsrc -rtsp_flags prefer_tcp -i {self._rtsp} -i sponsor_banner.png ' \
                      f'-filter_complex "overlay" ' \
                      f'-c:a aac -c:v libx264 -preset ultrafast -x264-params ' \
                      f'keyint=50:min-keyint=45 -f flv {self._rtmp}'
        else:
            command = f'ffmpeg -f lavfi -i anullsrc -rtsp_flags prefer_tcp -i {self._rtsp} ' \
                      f'-c:a aac -c:v libx264 -preset ultrafast -x264-params ' \
                      f'keyint=50:min-keyint=45 -f flv {self._rtmp}'
        return subprocess.Popen(command, shell=True, preexec_fn=os.setsid)

    def _thread(self):
        stream = self.__open_live_stream()
        while self._running:
            time.sleep(1)
            return_code = stream.poll()
            if return_code is not None:
                _log(LogEntry('warning', 'Video??bertragung', f'Bei der Video??bertragung ist ein Fehler aufgetreten, '
                                                             f'es wird ein automatischer Neustart eingeleitet. Fehlercode: {return_code}'))
                # _log(LogEntry('warning', 'Video??bertragung', 'Wenn die Zugangsdaten der Kamera falsch eingegeben '
                #                                              'wurden, ist ein Neustart der Kamera notwendig'))
                stream = self.__open_live_stream()

            if time.time() - self.start_time > 300:
                # _log(LogEntry('info', 'Video??bertragung', 'Video??bertragung wird automatisch neu gestartet.'))

                os.killpg(os.getpgid(stream.pid), signal.SIGTERM)

                stream = self.__open_live_stream()

        os.killpg(os.getpgid(stream.pid), signal.SIGTERM)


class WSUStream:
    def __init__(self):
        self.__running = False
        self.__off = False
        self.__raspberry = Raspberry(self.__toggle)
        self.__image_stream = ImageStream()
        self.__video_stream = VideoStream()
        self.__db = firestore.client()
        self.__db.collection(u'stream_settings').limit(1).on_snapshot(self.__on_snapshot)
        _log(LogEntry('info', 'Hauptprogramm', 'Programm erfolgreich gestartet'))

    @property
    def off(self):
        return self.__off

    def __on_snapshot(self, doc_snapshot, changes, read_time):
        self.__stop()
        data = doc_snapshot[0].to_dict()
        if data.get('run') is True:
            rtsp = f'rtsp://{data.get("cam_user")}:{data.get("cam_password")}@{data.get("cam_ip")}:554/Streaming/channels/' \
                   f'001/?transportmode=unicast'
            rtmp = f'rtmp://a.rtmp.youtube.com/live2/{data.get("stream_key")}'
            self.__start(rtsp, rtmp)

    def __update_state(self, state):
        try:
            docs = list(self.__db.collection(u'stream_settings').limit(1).stream())
            doc_id = docs[0].id
            doc_ref = self.__db.collection(u'stream_settings').document(doc_id)
            doc_ref.set({'run': state}, merge=True)
        except Exception as e:
            _log('error', 'Hauptprogramm', repr(e))

    def __start(self, rtsp, rtmp):
        if self.__running is False:
            self.__running = True
            self.__raspberry.led.on()
            _update_sponsor_banner()
            self.__image_stream.start(rtsp, rtmp)
            self.__video_stream.start(rtsp, rtmp)
            _log(LogEntry('info', '??bertragung', '??bertragung erfolgreich gestartet'))

    def __stop(self):
        if self.__running is True:
            self.__running = False
            self.__raspberry.led.off()
            self.__image_stream.stop()
            self.__video_stream.stop()
            _log(LogEntry('info', '??bertragung', '??bertragung erfolgreich beendet'))

    def __toggle(self):
        _log(LogEntry('info', 'Hauptprogramm', 'Knopf Bet??tigung registriert'))
        if not self.__running:
            self.__update_state(True)
        else:
            self.__update_state(False)

    def shut_down(self):
        self.__stop()
        self.__raspberry.close()
        _log(LogEntry('info', 'Hauptprogramm', 'Programm erfolgreich beendet'))
        self.__off = True


def _log(log_entry: LogEntry):
    try:
        db = firestore.client()
        doc_ref = db.collection(u'logs').document('camera1')
        doc_ref.set({log_entry.category: firestore.ArrayUnion([log_entry.dict])}, merge=True)
    except:
        pass


def _update_sponsor_banner():
    try:
        blob = storage.bucket('wsu-oepping.appspot.com').blob('media/sponsor_banner.png')
        blob.download_to_filename('sponsor_banner.png')
        _log(LogEntry('info', '??bertragung', 'Sponsoren Overlay erfolgreich aktualisiert'))
    except:
        _log(LogEntry('info', '??bertragung', 'Kein Sposoren Overlay verf??gbar'))
        if os.path.exists('sponsor_banner.png'):
            os.remove('sponsor_banner.png')


def run():
    global wsu_stream
    reset_timer = time.time()
    try:
        wsu_stream = WSUStream()
    except Exception as e:
        _log('error', 'Hauptprogramm', repr(e))
    while not wsu_stream.off:
        time.sleep(1)
        if time.time() - reset_timer > 3600 * 24 * 7:
          try:
            _log('info', 'Hauptprogramm', 'Betriebssystemneustart wird eingeleitet.')
            os.system('reboot')
          except:
            _log('error', 'Hauptprogramm', repr(e))


def shut_down():
    if wsu_stream is not None:
        wsu_stream.shut_down()


wsu_stream: Optional[WSUStream] = None
