import React from "react";
import { Link } from 'react-router-dom'

const Nav = ({ isAuthenticated, username, handleLogout }) => {
    return (
        <div className="Navbar">
            <Link to="/">Home</Link>
            {isAuthenticated ? (
                <>
                    <span>{username}</span>
                    <Link to="/Logout" onClick={handleLogout}>Logout</Link>
                </>
            ) : (
                <>
                    <Link to="/Login">Login</Link>
                    <Link to="/Register">Create Account</Link>
                </>
            )}
        </div>
    )
}

export default Nav