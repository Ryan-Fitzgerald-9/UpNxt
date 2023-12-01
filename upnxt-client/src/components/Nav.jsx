import React from "react";
import { Link } from 'react-router-dom'

const Nav = () => {
    return (
        <div className="Navbar">
            <Link to="/Login">Sign In</Link>
            <Link to="/Register">Create Account</Link>
        </div>
    )
}

export default Nav