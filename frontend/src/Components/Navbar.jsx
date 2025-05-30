import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav>
        <div>
            <Link to="/">Home</Link>
        </div>
        <div>
            <Link to="/profile">Profile</Link>
        </div>
        
        <div>
            <Link to="/login">Login</Link>
        </div>

        <div>
            <Link to="/SignUp">SignUp</Link>
        </div>

    </nav>
  )
}
