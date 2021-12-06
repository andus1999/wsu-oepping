import { Divider, Box, Card, Stack } from '@mui/material'
import React from 'react'

export default function CardComponent({children}) {
  return (
    <Box sx={{ width: '100%', maxWidth: '700px' }}>
      <Card variant='outlined'>
        <Stack alignItems='center' gap='20px' padding='5%'>
            {children}
        </Stack>
      </Card>
      <Divider sx={{marginTop: '20px'}}/>
    </Box>
  )
}
