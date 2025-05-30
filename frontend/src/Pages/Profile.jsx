import React,{useEffect,useState} from 'react'
import axios from 'axios';

export default function Profile() {
    let [UserData,setUserData] = useState({});

    useEffect(()=>{
        function GetDataFromLocalStorage()
        {
            let Data = JSON.parse(localStorage.getItem("user"));
            setUserData(Data);
        }
        GetDataFromLocalStorage();
    },[])


    async function handlePostSubmit(e)
    {
        e.preventDefault();
        let PostImage = e.target[0].value;
        let caption = e.target[1].value;
        let postBy= UserData._id;
        let Res = await axios.post("http://localhost:5100/api/posts",{
            PostImage,
            caption,
            postBy,
        })
        if(Res.status == 200)
        {
            console.log(Res.data)
        }
        else
        {
            console.log(Res.data)
        }
    }

  return (
    <div>
        <center>
            <h1>Profile Page Of {UserData.username}</h1>
        </center>
        {/* SHOW all Data */}
        <img height={400} src={UserData.profilePic} alt="" />
        <h3>{UserData.fullname}</h3>
        <p>Post Count: {UserData.postCount}</p>

        <hr />
        <form onSubmit={handlePostSubmit}>
            <input type="text" placeholder='Img' />
            <input type="text" placeholder='Caption' />
            <button>Post</button>

        </form>
    </div>
  )
}
