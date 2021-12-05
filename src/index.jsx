import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBZy1ximVYOYuN5xQym1cQH5Sb2t2PzIRw",
  authDomain: "wsu-oepping.firebaseapp.com",
  projectId: "wsu-oepping",
  storageBucket: "wsu-oepping.appspot.com",
  messagingSenderId: "605867963267",
  appId: "1:605867963267:web:d8718220d010245446fcb6",
  measurementId: "G-NBGPN6WVP5"
};

initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
