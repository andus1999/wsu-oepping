import createTheme from '@mui/material/styles/createTheme';
import Colors from './Colors';

const MuiTheme = createTheme({
  palette: {
    primary: {
      main: Colors.primary,
      light: Colors.primaryLight,
    },
    error: {
      main: Colors.red,
    }
  },
  shape: {
    borderRadius: 10,
  },
  typography: {
    fontSize: 16,
    fontFamily: 'Sora',
    h1: {
      fontWeight: 500,
    },
    h2: {
      fontWeight: 500,
    },
    h3: {
      fontWeight: 500,
    },
    h4: {
      fontWeight: 500,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
      fontSize: '1.2rem',
    },
  },
  components:{
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: 'rgba(255, 255, 255, .5)',
          backdropFilter: 'blur(5px)',
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: Colors.black,
        },
      },
    },
  },
});

export default MuiTheme;
