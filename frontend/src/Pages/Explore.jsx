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
                console.log(Res.data);
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
    <div className="max-w-5xl mx-auto pt-16 pb-4">
        {
            AllPost.map((post, index)=>{
                return(
                    <div key={index} className="bg-white border border-gray-200 rounded-lg mb-6 shadow-sm">
                        {/* Post Header */}
                        <div className="flex items-center px-4 py-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">

                                    <img src={post.postBy.profilePic} alt="Profile" className="w-full h-full rounded-full" />

                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-semibold text-gray-900">{post.postBy.username}</p>
                            </div>
                          
                        </div>
                        
                        {/* Post Image */}
                        <div className="w-full">
                            <img 
                                src={post.PostImage} 
                                alt="Post content"
                                className="w-full h-80 object-contain"
                            />
                        </div>
                        
                        {/* Post Actions */}
                        <div className="flex items-center px-4 py-3">
                            <button className="mr-4 hover:opacity-70">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </button>
                            <button className="mr-4 hover:opacity-70">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                            </button>
                            <button className="mr-4 hover:opacity-70">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </button>
                            <button className="ml-auto hover:opacity-70">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                </svg>
                            </button>
                        </div>
                        
                        {/* Likes */}
                        <div className="px-4 pb-2">
                            <p className="text-sm font-semibold text-gray-900">{post.likes.length} likes</p>
                        </div>
                        
                        {/* Caption */}
                        <div className="px-4 pb-3">
                            <p className="text-sm">
                                <span className="font-semibold text-gray-900 mr-2">Caption: </span>
                                {post.caption}
                            </p>
                        </div>
                        
                        {/* Comments */}
                        <div className="px-4 pb-3">
                            <button className="text-sm text-gray-500 hover:text-gray-700">
                                View all comments
                            </button>
                        </div>
                        
                        {/* Time */}
                        <div className="px-4 pb-3">
                            <p className="text-xs text-gray-400 uppercase">{post.createdAt}</p>
                        </div>
                    </div>
                )
            })
        }
    </div>
  )
}
