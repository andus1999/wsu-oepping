import './App.css';
import Visitor from './pages/Routes/Visitor';
import Admin from './pages/Routes/Admin';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import MuiTheme from './styles/MuiTheme';

function App() {
  const subDomain = window.location.hostname.split('.')[0]
  return (
    <>
      <ThemeProvider theme={MuiTheme}>
        <BrowserRouter>
          <Routes>
            {subDomain === 'admin' ? <Route path='/' exact element={<Admin />} />
            : <Route path='/' exact element={<Visitor />} />}
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
