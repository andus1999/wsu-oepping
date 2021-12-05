import './App.css';
import Home from './pages/Home';
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
            <Route path='/' exact element={<Home />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
