import { Box } from '@mui/material'
import React from 'react'
import { drawerWidth } from '../../resources/values'

export default function Content({ children }) {
  return (
    <Box 
      sx={{
        marginLeft: {xs: '0px', md: `${drawerWidth}px`},
        padding: '20px'}
      }
    >
      {children}
    </Box>
  )
}
