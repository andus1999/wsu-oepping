import React from 'react'
import { getAuth, signOut } from "firebase/auth";
import { 
  Button, 
  CircularProgress, 
  Divider, 
  Stack, 
  TextField, 
  InputAdornment,
  IconButton,
  Typography 
} from '@mui/material';
import Header from '../../components/basic/Header';
import Footer from '../../components/basic/Footer';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { collection, getDocs, getFirestore, setDoc, query, limit, onSnapshot, QuerySnapshot } from "firebase/firestore";

export default function Home() {
  const [ref, setRef] = React.useState(null);
  const [data, setData] = React.useState(null);
  const [showPass, setShowPass] = React.useState(false);

  const db = getFirestore();

  React.useEffect(() => {
    const q = query(collection(db, "stream_settings"), limit(1));
    const unsubscribe = onSnapshot(q, snap => {
      setData(snap.docs[0].data())
      setRef(snap.docs[0].ref)
    });

    return () => unsubscribe()
  }, []);

  const out = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
    }).catch((error) => {
    });
  }

  const updateData = async (run) => {
    data.run = run;
    if (ref != null) {
      await setDoc(ref, data);
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
    <>
      <Header />
      {data ? (<Stack 
        alignItems='center' 
        component="form" 
        onSubmit={(e) => {
          e.preventDefault()
          updateData(data.run)
        }}
        gap='20px 3%'
      >
        <Typography variant='h4'>
          Live Stream
        </Typography>
        <Stack 
          justifyContent='center' 
          gap='20px 3%' 
          direction='row' 
          flexWrap='wrap' 
          width='95%'
        >
          <Stack alignItems='center' gap='20px 3%'>
            <Typography variant='h6'>
              Kamera Einstellungen
            </Typography>
            <TextField 
              sx={{width: '100%'}}
              label='Benutzer' 
              onChange={(e) => setData({...data, cam_user: e.target.value})}
              defaultValue={data.cam_user}
            />
            <TextField 
              label='Passwort' 
              type={showPass ? 'text' : 'password'}
              onChange={(e) => setData({ ...data, cam_password: e.target.value })}
              defaultValue={data.cam_password}
              InputProps={{endAdornment}}
            />
            <TextField 
              sx={{ width: '100%' }}
              label='IP-Adresse' 
              onChange={(e) => setData({ ...data, cam_ip: e.target.value })}
              defaultValue={data.cam_ip}
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
              defaultValue={data.stream_key}
              InputProps={{ endAdornment }}
            />
          </Stack>
        </Stack>
        <Button type='submit' variant='outlined'>
          Speichern
        </Button>
        <Divider sx={{ width: '50%' }} />
        <Typography variant='h6'>
          Status
        </Typography>
        <Typography variant='h5'>
          {data.run ? 'Ein' : 'Aus'}
        </Typography>
        <Stack direction='row' gap='20px 10px'>
          <Button variant='outlined' onClick={() => updateData(true)}>
            Starten
          </Button>
          <Button variant='outlined' onClick={() => updateData(false)}>
            Stoppen
          </Button>
        </Stack>
        <Divider width='50%'/>
        <Button variant='outlined' onClick={out}>
          Abmelden
        </Button>
      </Stack>
      ) : (
      <Stack alignItems='center'>
        <CircularProgress/>
      </Stack>  
      )}
      <Footer />
    </>
  )
}
