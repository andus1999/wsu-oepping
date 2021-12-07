import React from 'react'
import {
  Routes,
  Route,
} from "react-router-dom";
import Login from '../Admin/Login';
import Home from '../Admin/Home';

import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Admin() {
  const [user, setUser] = React.useState(null);

  const auth = getAuth();

  React.useEffect(() => {
    onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u)
      } else {
        setUser(null)
      }
    });
  }, [auth])

  
  return (
    <Routes>
      <Route path='/' exact element={<>{user ? <Home /> : <Login />}</>} />
    </Routes>
  )
}
