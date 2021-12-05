import { Divider, Box, Card, Stack } from '@mui/material'
import React from 'react'

export default function CardComponent({children}) {
  return (
    <Box sx={{ width: '90%', maxWidth: '700px' }}>
      <Card variant='outlined'>
        <Stack alignItems='center' gap='30px' padding='30px'>
            {children}
        </Stack>
      </Card>
      <Divider sx={{marginTop: '20px'}}/>
    </Box>
  )
}
