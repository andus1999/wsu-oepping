import React from 'react'
import { Link } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import List from '@mui/material/List';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { ListItemButton } from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { drawerWidth } from '../../resources/values';
import { getAuth, signOut } from '@firebase/auth'
import { Typography } from '@mui/material';
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';


export default function DrawerComponent({ mobileOpen, handleDrawerToggle }) {
  const auth = getAuth();

  const handleSignOut = () => {
    signOut(auth).then(() => {
    }).catch((error) => {
    });
  }
  const listItems1 = [
    { name: 'Events', icon: <CalendarTodayOutlinedIcon />, to:'events' },
    { name: 'Mitglieder', icon: <GroupOutlinedIcon />, to: 'mitglieder' },
    { name: 'Kontakt', icon: <EmailOutlinedIcon />, to: 'kontakt' },
  ];
  const drawer = (
    <div style={{marginBottom: '100px'}}>
      <Divider />
      <Typography variant='h5' textAlign='center' sx={{margin: '20px 0'}}>
        Info
      </Typography>
      <Divider />
      <List>
        {listItems1.map((item, index) => (
          <ListItem key={item.name} >
            <ListItemButton component={Link} to={item.to} >
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );
  const container = window !== undefined ? () => window.document.body : undefined;
  return (
    <>
      <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              top: '80px',
              height: 'calc(100% - 80px)',
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              top: '80px',
              height: 'calc(100% - 80px)',
            },
          }}
          open
        >
          {drawer}
      </Drawer>
    </>
  )
}
