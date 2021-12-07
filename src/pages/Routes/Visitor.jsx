import React from 'react'
import {
  Routes,
  Route,
} from "react-router-dom";
import Home from '../Visitor/Home';

export default function Visitor() {
  return (
    <Routes>
      <Route path='/' exact element={<Home />} />
    </Routes>
  )
}
