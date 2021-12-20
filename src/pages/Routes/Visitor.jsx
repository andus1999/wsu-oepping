import React from 'react'
import {
  Routes,
  Route,
} from "react-router-dom";
import UnderConstruction from '../Visitor/UnderConstruction';

export default function Visitor() {
  return (
    <Routes>
      <Route path='/' exact element={<UnderConstruction />} />
    </Routes>
  )
}
