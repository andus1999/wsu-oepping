import { Typography, Button, Stack, Card, Alert } from '@mui/material';
import React from 'react';
import { setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

export default function SponsorBanner({docRef}) {
  const [src, setSrc] = React.useState(null);
  const [bannerMessage, setBannerMessage] = React.useState("");
  const [fileSelected, setFileSelected] = React.useState(false);
  const [messageColor, setMessageColor] = React.useState('info');
  const [fileExists, setFileExists] = React.useState(false);

  const storage = getStorage();
  const storageRef = ref(storage, 'media/sponsor_banner.png');
  const fileInput = React.createRef();

  const updateData = async () => {
    if (docRef != null) {
      await setDoc(docRef, { sponsor_banner: Math.random() }, { merge: true });
    }
  }

  getDownloadURL(storageRef)
    .then((url) => {
      if (src == null) setSrc(url);
      setFileExists(true);
    })
    .catch((error) => {
      console.log(error.code);
    });

  const onUpload = () => {
    const file = fileInput.current?.files[0];
    if (file) {
      setBannerMessage("Bild wird hochgeladen")
      setMessageColor('info');
      uploadBytes(storageRef, file).then(async (snapshot) => {
        await updateData();
        setBannerMessage("Bild erfolgreich hochgeladen")
        setMessageColor('success');
      })
    } else {
      setBannerMessage("Kein Bild ausgewählt");
      setMessageColor('error');
    }
  }

  const onDelete = () => {
    deleteObject(storageRef).then(async () => {
      await updateData();
      setBannerMessage("Bild gelöscht");
      setMessageColor("success");
    }).catch((error) => {
      setBannerMessage("Beim löschen ist ein Fehler aufgetreten");
      setMessageColor("error");
    });
  }

  const onChange = (e) => {
    console.log(fileInput.current?.files)
    const file = fileInput.current?.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = function () {
        if (this.width == 1280 && this.height == 720) {
          setSrc(url);
          setFileSelected(true);
          setBannerMessage("Auf hochladen klicken um die Auswahl zu bestätigen");
          setMessageColor('info');
        } else {
          setSrc("");
          setFileSelected(false);
          setBannerMessage("Das Bild muss 1280 x 720 Pixel groß sein");
          setMessageColor('error');
        }
      }
      img.src = url;
    }
  }

  return <Stack alignItems='center' gap='10px' width='100%' maxWidth='400px'>
    <Typography variant='h5' textAlign='center'>
      Sponsoren Overlay
    </Typography>
    <Typography variant='body2'>
      1280 x 720
    </Typography>
    {(src && <Card variant='outlined' style={{ margin: '20px 0' }}>
      <img src={src} style={{
        objectFit: 'contain',
        width: '100%',
        verticalAlign: 'top',
      }}></img>
    </Card>)}
    {bannerMessage && <Alert variant='outlined' severity={messageColor}>
      {bannerMessage}
    </Alert>}
    <Stack flexWrap='wrap' direction='row' justifyContent='center' gap='10px 20px'>
      <Button
        component="label"
      >
        Auswählen
        <input
          accept="image/png"
          type="file"
          hidden
          ref={fileInput}
          onChange={onChange}
        />
      </Button>
      {fileSelected && <Button onClick={onUpload}>
        Hochladen
      </Button>}
      {fileExists && <Button onClick={onDelete}>
        Löschen
      </Button>}
    </Stack>
  </Stack>;
}
