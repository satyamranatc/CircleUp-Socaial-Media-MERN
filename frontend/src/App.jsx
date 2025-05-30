import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"

import Explore from "./Pages/Explore.jsx"
import Profile from "./Pages/Profile.jsx"

import Login from "./Components/Login.jsx"
import SignUp from "./Components/SignUp.jsx"

import Navbar from "./Components/Navbar.jsx"
import Sidebar from "./Components/Sidebar.jsx"

export default function App() {
  return (
    <div>
        <BrowserRouter>
          <Navbar/>
          {/* <Sidebar/> */}
          <Routes>

            <Route path="/" element={<Explore/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<SignUp/>} />



          </Routes>  
        </BrowserRouter>
    </div>
  )
}
