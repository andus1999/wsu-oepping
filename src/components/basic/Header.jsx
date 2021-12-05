import { Box, Typography, Stack, IconButton } from '@mui/material'
import React from 'react'
import Colors from '../../styles/Colors';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import AcUnitOutlinedIcon from '@mui/icons-material/AcUnitOutlined';

export default function Header({handleDrawerToggle}) {
  return (
    <>
      <Stack 
        alignItems='center'
        direction='row'
        gap='20px'
        sx={{
          justifyContent: { xs: 'flex-start', sm: 'space-around' },
          zIndex: 1300,
          position: 'fixed', 
          height: '80px',
          width: '100%',
          background: Colors.milk,
          backdropFilter: 'blur(5px)',
          borderBottom: `1px solid ${Colors.primary}`,
          paddingLeft: '20px',
        }}
      >
        {handleDrawerToggle &&
          <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
            <IconButton onClick={handleDrawerToggle}>
              <MenuOutlinedIcon fontSize="large" sx={{ color: Colors.black }} />
            </IconButton>
          </Box>
        }
        <Typography variant='h4' color='primary'>
          WSU
        </Typography>
        <AcUnitOutlinedIcon />
      </Stack>
      <Box sx={{
        height: '80px',
        marginBottom: '20px',
      }}
      />
    </>
  )
}
