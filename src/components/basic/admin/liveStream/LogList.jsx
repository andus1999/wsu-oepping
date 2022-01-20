import { List, ListItem, ListItemText, Stack, Typography, Divider } from '@mui/material'
import React from 'react'
import { collection, getDocs, getFirestore, setDoc, query, limit, onSnapshot, QuerySnapshot, doc } from "firebase/firestore";


export default function LogList() {
  const [logs, setLogs] = React.useState(null);
  const db = getFirestore();

  React.useEffect(() => {
    // const logRef = doc(db, 'logs', 'camera1');
    const logRef = collection(db, 'logs');
    const unsubscribe = onSnapshot(logRef, c => {
      let info = [];
      let warning = [];
      let error = [];
      c.forEach((doc) => {
        const d = doc.data();
        d.info && (info = info.concat(d.info));
        d.warning && (warning = warning.concat(d.warning));
        d.error && (error = error.concat(d.error));
      });
      info.sort((a, b) => a.timestamp - b.timestamp);
      warning.sort((a, b) => a.timestamp - b.timestamp);
      error.sort((a, b) => a.timestamp - b.timestamp);
      const logData = {};
      info.length && (logData['info'] = info);
      warning.length && (logData['warning'] = warning);
      error.length && (logData['error'] = error);
      setLogs(logData);
      //setLogs(d.data());
    });

    return unsubscribe
  }, []);

  const getBody = (it) => `${it.message} - ${new Date(it.timestamp * 1000).toLocaleString('de-DE')}`
  const maxEntries = 5;
  const infos = logs?.info ? logs.info.slice(-maxEntries).map((it) => (<ListItem key={getBody(it)}>
    <ListItemText primary={it.source} secondary={getBody(it)} />
  </ListItem>)) : null
  const warnings = logs?.warning ? logs.warning.slice(-maxEntries).map((it) => (<ListItem key={getBody(it)}>
    <ListItemText primary={it.source} secondary={getBody(it)} />
  </ListItem>)) : null
  const errors = logs?.error ? logs.error.slice(-maxEntries).map((it) => (<ListItem key={getBody(it)}>
    <ListItemText primary={it.source} secondary={getBody(it)} />
  </ListItem>)) : null
  return (
    <>
      {logs && <Stack alignItems='center' gap='20px'>
        <Typography variant='h5'>
          Logs
        </Typography>
        <Divider width='20%' />
        {errors && <><Typography variant='h6'>
          Fehler
        </Typography>
          <List>
            {errors}
          </List>
          <Divider width='20%' /></>}
        {warnings && <><Typography variant='h6'>
          Warnungen
        </Typography>
          <List>
            {warnings}
          </List>
          <Divider width='20%' /></>}
        {infos && <><Typography variant='h6'>
          Infos
        </Typography>
          <List>
            {infos}
          </List>
          <Divider width='20%' /></>}
      </Stack>}
    </>
  )
}
