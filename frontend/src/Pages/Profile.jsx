import React, { useEffect, useState } from 'react'
import { User, Camera, Grid, Bookmark } from 'lucide-react'

export default function Profile({ UserData }) {
    let [AllPost, setAllPost] = useState([]);
    let [UserProfileData, setUserProfileData] = useState([]);
    let [PostUpload, setPostUpload] = useState(false);
    let [showEditForm, setShowEditForm] = useState(false);

    async function handleUserUpdate(e) {
        e.preventDefault();
        
        // Your original API logic
        let Res = await fetch(`http://localhost:5100/api/users/update/${UserData._id}`, {
            method: 'PUT',
            headers: {
                
                'Content-Type': 'application/json',
                 Authorization: `${JSON.parse(localStorage.getItem("user")).token}`
            },
            body: JSON.stringify({
                fullname: e.target[0].value,
                username: e.target[1].value,
                email: e.target[2].value,
                password: e.target[3].value,
            })
        });


        
        if(Res.status == 200) {
            console.log(await Res.json())
            setShowEditForm(false);
        } else {
            console.log(await Res.json())
        }
    }

    async function handlePostSubmit(e) {
        e.preventDefault();
        setPostUpload(true);
        let PostImage = e.target[0].value;
        let caption = e.target[1].value;
        let postBy = UserData._id;
        
        // Your original API logic
        let Res = await fetch("http://localhost:5100/api/posts", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${JSON.parse(localStorage.getItem("user")).token}`
            },
            body: JSON.stringify({
                PostImage,
                caption,
                postBy,
            })
        });
        
        if(Res.status == 200) {
            console.log(await Res.json())
        } else {
            console.log(await Res.json())
        }

        setTimeout(() => {
            setPostUpload(false);
        }, 2000);
    }

    useEffect(() => {
        async function GetAllPost() {
            let Data = JSON.parse(localStorage.getItem("user"));
            let Res = await fetch(`http://localhost:5100/api/posts/postBy/${Data._id}`, {
                headers: {
                    Authorization: `${JSON.parse(localStorage.getItem("user")).token}`
                }
            });
            
            if(Res.status == 200) {
                console.log(await Res.json());
                setAllPost(await Res.json())
            } else {
                console.log(await Res.json())
            }
        }
        GetAllPost();
    }, [PostUpload])

    useEffect(() => {
        async function GetUserData() {
            let id = JSON.parse(localStorage.getItem("user"))._id
            let UserDataRes = await fetch(`http://localhost:5100/api/users/${id}`, {
                headers: {
                    Authorization: `${JSON.parse(localStorage.getItem("user")).token}`
                }
            });
            
            if(UserDataRes.status == 200) {
                console.log(await UserDataRes.json());
                setUserProfileData(await UserDataRes.json())
            } else {
                console.log(await UserDataRes.json())
            }
        }
        GetUserData();
    }, [PostUpload])

    return (
        <div className="min-h-screen bg-gray-50 pt-16">
            <div className="max-w-5xl mx-auto px-4 py-8">
                {/* Profile Header */}
                <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8 mb-8">
                    {/* Profile Picture */}
                    <div className="flex-shrink-0">
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-1">
                            <img 
                                src={UserData?.profilePic || 'https://via.placeholder.com/150'} 
                                alt="Profile" 
                                className="w-full h-full rounded-full object-cover bg-white p-1"
                            />
                        </div>
                    </div>
                    
                    {/* Profile Info */}
                    <div className="flex-1 text-center md:text-left">
                        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-4">
                            <h1 className="text-2xl font-light text-gray-900 mb-2 md:mb-0">
                                {UserData?.username || 'Username'}
                            </h1>
                            <button 
                                onClick={() => setShowEditForm(!showEditForm)}
                                className="bg-blue-500 text-white px-6 py-1.5 rounded font-semibold text-sm hover:bg-blue-600 transition-colors"
                            >
                                Edit Profile
                            </button>
                        </div>
                        
                        {/* Stats */}
                        <div className="flex justify-center md:justify-start space-x-8 mb-4">
                            <div className="text-center">
                                <span className="font-semibold text-gray-900">{UserProfileData?.postCount || 0}</span>
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
                            <p className="font-semibold text-gray-900">{UserProfileData?.fullname || 'Full Name'}</p>
                            <p className="text-gray-600">Bio goes here...</p>
                        </div>
                    </div>
                </div>

                {/* Edit Profile Form */}
                {showEditForm && (
                    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Edit Profile</h2>
                        <form onSubmit={handleUserUpdate}>
                            <div className="space-y-4">
                                <input 
                                    defaultValue={UserData?.profilePic || ''} 
                                    type="text" 
                                    placeholder="Profile Pic URL" 
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                                />
                                <input 
                                    defaultValue={UserData?.fullname || ''} 
                                    type="text" 
                                    placeholder="Full Name" 
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                                />
                                <input 
                                    defaultValue={UserData?.username || ''} 
                                    type="text" 
                                    placeholder="Username" 
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                                />
                                <input 
                                    defaultValue={UserData?.email || ''} 
                                    type="email" 
                                    placeholder="Email" 
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                                />
                                <div className="flex space-x-3">
                                    <button 
                                        type="submit"
                                        
                                        className="flex-1 bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                                    >
                                        Update
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={() => setShowEditForm(false)}
                                        className="flex-1 bg-gray-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                )}

                {/* Create Post Section */}
                {!PostUpload ? (
                    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Create New Post</h2>
                        <div onSubmit={handlePostSubmit}>
                            <div className="space-y-4">
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
                                    />
                                </div>
                                <button 
                                    type="submit"
                                    onClick={handlePostSubmit}
                                    className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                                >
                                    Share Post
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8 shadow-sm text-center">
                        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-3"></div>
                        <h2 className="text-lg font-semibold text-gray-900">Uploading Post...</h2>
                        <p className="text-gray-600">Please wait while we process your post.</p>
                    </div>
                )}

                {/* Posts Grid */}
                <div className="border-t border-gray-200 pt-8">
                    <div className="flex justify-center space-x-16 mb-8">
                        <button className="flex items-center space-x-2 text-gray-900 border-t-2 border-gray-900 pt-4">
                            <Grid className="w-4 h-4" />
                            <span className="text-xs uppercase font-semibold tracking-wide">Posts</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-400 pt-4">
                            <Bookmark className="w-4 h-4" />
                            <span className="text-xs uppercase font-semibold tracking-wide">Saved</span>
                        </button>
                    </div>
                    
                    {/* Posts Grid */}
                    {AllPost && AllPost.length > 0 ? (
                        <div className="grid grid-cols-3 gap-1 md:gap-4">
                            {AllPost.map((post, index) => (
                                <div key={index} className="aspect-square bg-gray-100 rounded-lg overflow-hidden hover:opacity-90 transition-opacity cursor-pointer">
                                    <img 
                                        src={post.PostImage} 
                                        alt="Post" 
                                        className="w-full h-full object-cover" 
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <Camera className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-xl font-medium text-gray-900 mb-2">No Posts Yet</h3>
                            <p className="text-gray-600">Start sharing your moments!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}