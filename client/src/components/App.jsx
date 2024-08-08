import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './Register';
import Home from './Home';
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import Profile from './Profile';
import FavoriteNews from './FavoriteNews';
import './index.css';
//export const ipAddress = 'https://server-dunm.onrender.com'
// config.js
export const ipAddress = 'http://localhost:3001'; // או הכתובת שלך באינטרנט

function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/FavoriteNews" element={<FavoriteNews />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
