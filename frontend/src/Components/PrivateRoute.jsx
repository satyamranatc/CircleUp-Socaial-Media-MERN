import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function PrivateRoute({UserData,Component}) {
    let navigate = useNavigate();
    if(UserData)
    {
        return Component
    }
    else{
        navigate("/login")
    }
  
}
