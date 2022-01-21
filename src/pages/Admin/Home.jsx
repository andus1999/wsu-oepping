import React from 'react'
import { getAuth, signOut } from "firebase/auth";
import {
  Button,
  Stack,
} from '@mui/material';
import Header from '../../components/basic/Header';
import Footer from '../../components/basic/Footer';

import LiveStream from '../../components/basic/admin/LiveStream';

export default function Home() {
  const out = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
    }).catch((error) => {
    });
  }

  return (
    <>
      <Header />
      <Stack
        width='100%'
        alignItems='center'
        gap='40px'>
        <LiveStream />
        <Button onClick={out}>
          Abmelden
        </Button>
      </Stack>
      <Footer />
    </>
  )
}
