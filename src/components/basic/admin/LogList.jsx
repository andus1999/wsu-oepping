import { List, ListItem, ListItemText, Stack, Typography } from '@mui/material'
import React from 'react'

export default function LogList({logs}) {
  const getBody = (it) => `${it.message} - ${new Date(it.timestamp * 1000).toLocaleString('de-DE')}`
  const maxEntries = 5;
  const infos = logs.info ? logs.info.slice(-maxEntries).map((it) => (<ListItem>
    <ListItemText primary={it.source} secondary={getBody(it)}/>
  </ListItem>)) : null
  const warnings = logs.warning ? logs.warning.slice(-maxEntries).map((it) => (<ListItem>
    <ListItemText primary={it.source} secondary={getBody(it)} />
  </ListItem>)) : null
  const errors = logs.error ? logs.error.slice(-maxEntries).map((it) => (<ListItem>
    <ListItemText primary={it.source} secondary={getBody(it)} />
  </ListItem>)) : null
  return (
    <>
      <Stack alignItems='center'>
        <Typography variant='h4' marginBottom='20px'>
          Logs
        </Typography>
        {errors && <><Typography variant='h6'>
          Fehler
        </Typography>
        <List>
          {errors}
        </List></>}
        {warnings && <><Typography variant='h6'>
          Warnungen
        </Typography>
        <List>
          {warnings}
        </List></>}
        {infos && <><Typography variant='h6'>
          Infos
        </Typography>
        <List>
          {infos}
        </List></>}
      </Stack>
    </>
  )
}
