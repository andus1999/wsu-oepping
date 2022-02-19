import { Box } from '@mui/material'
import React from 'react'
import { drawerWidth } from '../../resources/values'

export default function Content({ children }) {
  return (
    <Box
      sx={{
        marginLeft: { xs: '0px', sm: `${drawerWidth}px` },
        padding: '3%',
      }}
    >
      {children}
    </Box>
  )
}
