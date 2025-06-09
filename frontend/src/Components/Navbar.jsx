import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar({ UserData, setUserData }) {

    return (
        <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
            <div className="max-w-5xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Circle Up
                        </Link>
                    </div>

                    {/* Search Bar - Hidden on mobile */}
                    <div className="hidden md:flex flex-1 max-w-xs mx-8">
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-full bg-gray-100 rounded-lg py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <svg className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex items-center space-x-6">


                        {
                            !UserData ?
                                <div className='flex space-x-4 items-center'>

                                    <Link to="/login" className="text-gray-700 hover:text-gray-900 transition-colors">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                        </svg>
                                    </Link>

                                    <Link to="/signup" className="bg-blue-500 text-white px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors">
                                        Sign Up
                                    </Link></div>
                                :
                                <div className='flex space-x-4 items-center'>
                                    <Link to="/" className="text-gray-700 hover:text-gray-900 transition-colors">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                        </svg>
                                    </Link>

                                    <Link to="/profile" className="text-gray-700 hover:text-gray-900 transition-colors">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </Link>
                                    <h2>{UserData.name}</h2>
                                    <button className="bg-red-500 text-white px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-red-600 transition-colors" onClick={() => {
                                        localStorage.removeItem("user");
                                        window.location.reload();
                                    }} >Log Out
                                    </button>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </nav>
    )
}