import React from "react";
import { Link } from 'react-router-dom'
import Logout from "./Logout"

const Nav = ({ isAuthenticated, username, handleLogout }) => {
    return (
        <div className="flex items-center justify-between p-4 z-[100] w-full absolute">
            {/* Home link */}
            <Link to="/" className='text-white text-5xl font-bold cursor-pointer'>UpNxt</Link>
            {/* Conditional rendering based on user authentication */}
            {isAuthenticated ? (
                <div className="flex">
                    {/* Link to user's Favorites */}
                    <Link to="/Favorites" className="text-white py-2 text-xl pr-5">Favorites</Link>
                    <Logout />
                </div>
            ) : (
                <div>
                    {/* Link to Login page for non-authenticated users */}
                    <Link to="/Login" className="text-white text-xl pr-5">Login</Link>
                    {/* Link to Register page for non-authenticated users */}
                    <Link to="/Register" className="bg-red-600 px-6 py-2 rounded cursor-pointer text-white">Sign Up</Link>
                </div>
            )}
        </div>
    )
}

export default Nav