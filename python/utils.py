from firebase_admin import credentials, storage, firestore, initialize_app


def increment_version(current):
    split = current.split('.')
    split[-1] = str(int(split[-1]) + 1)
    new = ''
    for i in range(len(split)):
        if i != 0:
            new += '.'
        new += split[i]
    return new


def update_version():
    doc_ref = db.collection(u'bootloader').document(u'versions')
    doc = doc_ref.get()
    data = doc.to_dict()
    new_version = increment_version(data['main'])
    doc_ref.set({u'main': new_version}, merge=True)


def upload_source():
    blob = storage.bucket('wsu-oepping.appspot.com').blob('python/main.py')
    blob.upload_from_filename('main.py')


def update_firmware():
    upload_source()
    update_version()


cred = credentials.Certificate("wsu-oepping-firebase-adminsdk.json")
initialize_app(cred)
db = firestore.client()
