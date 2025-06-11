import React,{useState,useEffect} from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"

import Explore from "./Pages/Explore.jsx"
import Profile from "./Pages/Profile.jsx"

import Login from "./Components/Login.jsx"
import SignUp from "./Components/SignUp.jsx"
import PrivateRoute from "./Components/PrivateRoute.jsx"

import Navbar from "./Components/Navbar.jsx"
import Sidebar from "./Components/Sidebar.jsx"

export default function App() {
//? Checking The User signin
    let [UserData,setUserData] = useState({});

    useEffect(()=>{
        function GetDataFromLocalStorage()
        {
            let Data = JSON.parse(localStorage.getItem("user"));

            setUserData(Data);
        }
        GetDataFromLocalStorage();
    },[])

  return (
    <div className="min-h-screen bg-gray-50">
        <BrowserRouter>
          <Navbar UserData = {UserData}  setUserData = {setUserData}/>
          {/* <Sidebar/> */}
          <Routes>

            <Route path="/" element={<PrivateRoute UserData = {UserData} Component = {<Explore/>} />} />
            <Route path="/profile" element={<PrivateRoute UserData = {UserData} Component = {<Profile UserData = {UserData} />} />} />
            <Route path="/login" element={<Login setUserData = {setUserData}/>} />
            <Route path="/signup" element={<SignUp setUserData = {setUserData}/>} />
          </Routes>  
        </BrowserRouter>
    </div>
  )
}