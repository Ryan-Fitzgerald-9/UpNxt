import React from "react";
import { Link } from 'react-router-dom'

const Nav = () => {
    return (
        <div className="Navbar">
            <Link to="/">Home</Link>
            <Link to="/Login">Login</Link>
            <Link to="/Logout">Logout</Link>
            <Link to="/Register">Create Account</Link>
        </div>
    )
}

export default Nav