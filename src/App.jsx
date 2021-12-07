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
  return (
    <>
      <ThemeProvider theme={MuiTheme}>
        <BrowserRouter>
          <Routes>
            <Route path='/admin/*' element={<Admin />} />
            <Route path='/' exact element={<Visitor />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
