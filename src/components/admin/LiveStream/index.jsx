import React from 'react'
import { getAuth, signOut } from "firebase/auth";
import {
  Button,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from '@mui/material';

import { collection, getDocs, getFirestore, setDoc, query, limit, onSnapshot, QuerySnapshot, doc } from "firebase/firestore";
import LogList from './LogList';
import SponsorBanner from './SponsorBanner';
import Settings from './Settings';
import Status from './Status';

export default function LiveStream() {
  const [data, setData] = React.useState(null);
  const [docRef, setDocRef] = React.useState(null);

  const db = getFirestore();

  React.useEffect(() => {
    const q = query(collection(db, "stream_settings"), limit(1));
    const unsubscribe = onSnapshot(q, snap => {
      setData(snap.docs[0].data())
      setDocRef(snap.docs[0].ref);
    });
    return unsubscribe
  }, [])

  return (
    <>
      {(data && docRef) ? (<Stack
        alignItems='center'
        gap='40px'
        width='90%'
        maxWidth='1200px'
      >
        <Typography variant='h4' textAlign='center'>
          Live Stream
        </Typography>
        <Divider width='50%' />
        <Status data={data} docRef={docRef} />
        <Divider width='50%' />
        <Stack width='100%' direction='row' flexWrap='wrap' gap='60px 20px' justifyContent='space-around'>
          <SponsorBanner docRef={docRef} />
          <Settings initializationData={data} docRef={docRef} />
        </Stack>
        <Divider width='50%' />
        <LogList />
      </Stack>
      ) : (
        <Stack alignItems='center'>
          <CircularProgress />
        </Stack>
      )}
    </>
  )
}
