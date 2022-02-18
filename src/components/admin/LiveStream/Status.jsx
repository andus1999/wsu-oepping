import React from 'react';
import { setDoc } from "firebase/firestore";
import {
  Button,
  Stack,
  Typography,
} from '@mui/material';

import CastIcon from '@mui/icons-material/Cast';
import CastConnectedIcon from '@mui/icons-material/CastConnected';
import Colors from '../../../styles/Colors';

export default function Status({ data, docRef }) {
  const updateData = async (run) => {
    if (docRef != null) {
      await setDoc(docRef, { run }, { merge: true });
    }
  }
  return <>
    <Stack alignItems='center' gap='15px'>
      <Typography variant='h5'>
        Status
      </Typography>
      {data.run ?
        <CastConnectedIcon sx={{ fontSize: 80, color: Colors.primary }} /> :
        <CastIcon sx={{ fontSize: 80, color: Colors.black }} />}
      <Typography variant='h5' marginBottom='20px'>
        {data.run ? 'Ein' : 'Aus'}
      </Typography>
      <Stack direction='row' gap='10px 20px' flexWrap='wrap' justifyContent='center'>
        <Button onClick={() => updateData(true)}>
          Starten
        </Button>
        <Button onClick={() => updateData(false)}>
          Stoppen
        </Button>
      </Stack>
    </Stack>
  </>;
}
