import {
  Stack, Typography, TextField, Button, InputAdornment,
  IconButton, Alert
} from '@mui/material';
import React from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { setDoc } from "firebase/firestore";


export default function Settings({ initializationData, docRef }) {
  const [data, setData] = React.useState(null);
  const [showPass, setShowPass] = React.useState(false);
  const [alert, setAlert] = React.useState("");
  const [error, setError] = React.useState("");

  if (data == null) setData(initializationData);

  const updateData = async () => {
    setError("");
    setAlert("");
    if (docRef != null) {
      await setDoc(docRef, data);
      setAlert("Einstellungen erfolgreich gespeichert");
    }
  }

  const endAdornment = (
    <InputAdornment position="end">
      <IconButton
        onClick={() => setShowPass(!showPass)}
        edge="end"
      >
        {showPass ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  )

  return (
    <Stack
      gap='20px'
      maxWidth='700px'
      width='100%'
      component="form"
      onSubmit={(e) => {
        e.preventDefault()
        updateData()
      }}
      alignItems='center'>
      <Typography variant='h5'>
        Einstellungen
      </Typography>
      <Stack
        justifyContent='center'
        gap='20px 3%'
        direction='row'
        flexWrap='wrap'
        width='100%'
      >
        <Stack alignItems='center' gap='20px 3%'>
          <Typography variant='h6'>
            Kamera Einstellungen
          </Typography>
          <TextField
            sx={{ width: '100%' }}
            label='Benutzer'
            onChange={(e) => setData({ ...data, cam_user: e.target.value })}
            defaultValue={initializationData.cam_user}
          />
          <TextField
            label='Passwort'
            type={showPass ? 'text' : 'password'}
            onChange={(e) => setData({ ...data, cam_password: e.target.value })}
            defaultValue={initializationData.cam_password}
            InputProps={{ endAdornment }}
          />
          <TextField
            sx={{ width: '100%' }}
            label='IP-Adresse'
            onChange={(e) => setData({ ...data, cam_ip: e.target.value })}
            defaultValue={initializationData.cam_ip}
          />
        </Stack>
        <Stack alignItems='center' gap='20px 3%'>
          <Typography variant='h6'>
            Youtube Einstellungen
          </Typography>
          <TextField
            label='Stream Schlüssel'
            type={showPass ? 'text' : 'password'}
            onChange={(e) => setData({ ...data, stream_key: e.target.value })}
            defaultValue={initializationData.stream_key}
            InputProps={{ endAdornment }}
          />
        </Stack>
      </Stack>
      {alert && <Alert variant='outlined' severity='success'>
        {alert}
      </Alert>}
      {error && <Alert variant='outlined' severity='error'>
        {error}
      </Alert>}
      <Button type='submit'>
        Speichern
      </Button>
    </Stack>);
}
