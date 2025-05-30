import React,{useState,useEffect} from 'react'
import axios from 'axios'

export default function Login() {

    async function handleSubmit(e) 
    {

        e.preventDefault();
        const email = e.target[0].value;

        const Res = await axios.post("http://localhost:5100/api/users/login",{
            email,
        })
        if(Res.status == 200)
        {
            console.log(Res.data)
            localStorage.setItem("user",JSON.stringify(Res.data))
        }
        else
        {
            console.log(Res.data)
        }

        
    }


  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder='email' />
            <button>Login</button>
        </form>
    </div>
  )
}
