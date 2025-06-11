import React,{useEffect,useState} from 'react'
import axios from 'axios';

export default function Profile({UserData}) {
    let [AllPost,setAllPost] = useState([]);
    let [PostUpload,setPostUpload] = useState(false);


    async function handlePostSubmit(e)
    {
        e.preventDefault();
        setPostUpload(true);
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

        setTimeout(() => {
            setPostUpload(false);
        }, 2000);
    }

    useEffect(()=>{
        async function GetAllPost()
        {
            let Data = JSON.parse(localStorage.getItem("user"));
            let Res = await axios.get(`http://localhost:5100/api/posts/postBy/${Data._id}`)
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
        // console.log(UserData);
    },[PostUpload])

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-5xl mx-auto px-4 py-8">
            {/* Profile Header */}
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8 mb-8">
                {/* Profile Picture */}
                <div className="flex-shrink-0">
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-1">
                        <img 
                            src={UserData.profilePic} 
                            alt="Profile" 
                            className="w-full h-full rounded-full object-cover bg-white p-1"
                        />
                    </div>
                </div>
                
                {/* Profile Info */}
                <div className="flex-1 text-center md:text-left">
                    <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-4">
                        <h1 className="text-2xl font-light text-gray-900 mb-2 md:mb-0">
                            {UserData.username}
                        </h1>
                        <button className="bg-blue-500 text-white px-6 py-1.5 rounded font-semibold text-sm hover:bg-blue-600 transition-colors">
                            Edit Profile
                        </button>
                    </div>
                    
                    {/* Stats */}
                    <div className="flex justify-center md:justify-start space-x-8 mb-4">
                        <div className="text-center">
                            <span className="font-semibold text-gray-900">{UserData.postCount}</span>
                            <p className="text-sm text-gray-600">posts</p>
                        </div>
                        <div className="text-center">
                            <span className="font-semibold text-gray-900">500</span>
                            <p className="text-sm text-gray-600">followers</p>
                        </div>
                        <div className="text-center">
                            <span className="font-semibold text-gray-900">300</span>
                            <p className="text-sm text-gray-600">following</p>
                        </div>
                    </div>
                    
                    {/* Bio */}
                    <div className="text-sm">
                        <p className="font-semibold text-gray-900">{UserData.fullname}</p>
                        <p className="text-gray-600">Bio goes here...</p>
                    </div>
                </div>
            </div>

            {/* Create Post Section */}
            {
                !PostUpload? 
                  <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Create New Post</h2>
                <form onSubmit={handlePostSubmit} className="space-y-4">
                    <div>
                        <input 
                            type="text" 
                            placeholder="Image URL" 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                        />
                    </div>
                    <div>
                        <textarea 
                            placeholder="Write a caption..."
                            rows="3"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm resize-none"
                        ></textarea>
                    </div>
                    <button 
                        type="submit"
                        className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                    >
                        Share Post
                    </button>
                </form>
            </div>:
            <div>
                <h2>Uploaded Post</h2>
            </div>
            }

            {/* Posts Grid */}
            <div className="border-t border-gray-200 pt-8">
                <div className="flex justify-center space-x-16 mb-8">
                    <button className="flex items-center space-x-2 text-gray-900 border-t-2 border-gray-900 pt-4">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"></path>
                        </svg>
                        <span className="text-xs uppercase font-semibold tracking-wide">Posts</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-400 pt-4">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                        <span className="text-xs uppercase font-semibold tracking-wide">Saved</span>
                    </button>
                </div>
                
                {/* Posts Grid Placeholder */}
                <div className="grid grid-cols-3 gap-1 md:gap-4">
                    {
                        AllPost.map((post, index)=>{
                            return(
                                <div key={index} className="bg-white border border-gray-200  mb-6 shadow-sm">
                                    <img src={post.PostImage} alt="Post" className="w-full h-full object-cover" />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    </div>
  )
}