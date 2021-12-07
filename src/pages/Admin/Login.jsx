import { Button, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import Footer from '../../components/basic/Footer'
import Header from '../../components/basic/Header'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const [user, setUser] = React.useState('')
  const [password, setPasssword] = React.useState('')
  const [error, setError] = React.useState(null)

  const auth = getAuth();

  const signIn = (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, `${user}@wsu-oepping.web.app`, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        setError(error.code);
      });
  }

  return (
    <>
      <Header />
      <form onSubmit={signIn}>
        <Stack margin='100px 0' gap='40px 3%' alignItems='center'>
          <Typography variant='h4'>Admin Anmeldung</Typography>
          <TextField label='Benutzer' onChange={(e) => setUser(e.target.value)}/>
          <TextField label='Passwort' type='password' onChange={(e) => setPasssword(e.target.value)}/>
          {error && <Typography variant='body1' color='error'>
            {error}
          </Typography>}
          <Button variant='outlined' type='submit'>
            Anmelden
          </Button>
        </Stack>
      </form>
      <Footer />
    </>
  )
}
