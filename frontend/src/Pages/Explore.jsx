import React,{useState,useEffect} from 'react'
import axios from 'axios'

export default function Explore() {
    let [AllPost,setAllPost] = useState([]);

    useEffect(()=>{
        async function GetAllPost()
        {
            let Res = await axios.get("http://localhost:5100/api/posts")
            if(Res.status == 200)
            {
                setAllPost(Res.data)
            }
            else
            {
                console.log(Res.data)
            }
        }
        GetAllPost();
        
    },[])
  return (
    <div>
        {
            AllPost.map((post)=>{
                return(
                    <div>
                        <img src={post.PostImage} />
                        <p>{post.caption}</p>
                    </div>
                )
            })
        }
    </div>
  )
}
