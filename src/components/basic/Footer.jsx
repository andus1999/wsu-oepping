import { Stack, Typography } from '@mui/material'
import React from 'react'
import Colors from '../../styles/Colors'
import AcUnitOutlinedIcon from '@mui/icons-material/AcUnitOutlined';

export default function Footer() {
  return (
    <>
      <Stack 
        sx={{
          height: '300px',
          marginTop: '30px',
          background: Colors.primary,
        }}
        gap='20px'
        alignItems='center'
        justifyContent='center'
      >
        <AcUnitOutlinedIcon sx={{color: Colors.white}}/>
        <Typography variant='h4' color='white'>
          WSU
        </Typography>
        <Typography variant='body2' color='white'>
          {`© ${new Date().getFullYear()} Wintersportunion Oepping`}
        </Typography>
      </Stack>
    </>
  )
}
