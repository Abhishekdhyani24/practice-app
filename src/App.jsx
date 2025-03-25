import { Suspense, useState } from 'react'
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/auth/login'
import Home from './pages/home'
import Users from './pages/users';
import UsersAdd from './pages/users/add';
import image from '../src/assets/loader.gif'
import { Provider } from "react-redux";
import configureStoreProd from "./config/configureStore.prod";
import { PersistGate } from "redux-persist/integration/react";


const { persistor, store } = configureStoreProd();

function App() {
  return (
    <>
     <Provider store={store}>
     <PersistGate loading={"loading ..."} persistor={persistor}>
    <Router>
    <Suspense fallback={
              <div id="loader" className="loaderDiv">
                <img src={image} alt="logo" className="loaderlogo" />
              </div>
            }/>
    <Routes>
    <Route  path="/" element={<Login />} />
    <Route  path="/home" element={<Home />} />
    <Route  path="/users" element={<Users />} />
    <Route  path="/users/add" element={<UsersAdd />} />
    <Route  path="/users/edit/:id" element={<UsersAdd />} />




    </Routes>
    </Router>
    </PersistGate>
    </Provider>
    </>
  )
}

export default App
