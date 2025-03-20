import { useState } from 'react'
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/auth/login'
import Home from './pages/home'
import Users from './pages/users';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
    <Routes>
    <Route  path="/" element={<Login />} />
    <Route  path="/home" element={<Home />} />
    <Route  path="/users" element={<Users />} />


    </Routes>
    </Router>
  
    </>
  )
}

export default App
