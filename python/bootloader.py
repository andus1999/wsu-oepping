import time

from firebase_admin import credentials, storage, firestore, initialize_app
import main
import importlib
import time
from threading import Thread
from typing import Optional


def on_snapshot(doc_snapshot, changes, read_time):
    global main_thread
    if main_thread is not None:
        main.shut_down()
        main_thread.join()
    update_main()
    importlib.reload(main)
    main_thread = Thread(target=main.run)
    main_thread.start()


def run():
    cred = credentials.Certificate("wsu-oepping-firebase-adminsdk.json")
    initialize_app(cred)
    db = firestore.client()
    db.collection(u'bootloader').document('versions').on_snapshot(on_snapshot)
    while True:
        time.sleep(1)


def update_main():
    print('Downloading main program.')
    blob = storage.bucket('wsu-oepping.appspot.com').blob('python/main.py')
    blob.download_to_filename('main.py')


main_thread: Optional[Thread] = None

if __name__ == '__main__':
    run()
