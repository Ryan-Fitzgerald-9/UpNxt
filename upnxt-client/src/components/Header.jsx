import React from "react";
import Nav from './Nav'

const Header = ({ isAuthenticated, username, handleLogout }) => {
    return (
        <header>
            <h1>UpNxt</h1>
            <Nav
                isAuthenticated={isAuthenticated}
                username={username}
                handleLogout={handleLogout}
            />
        </header>
    )
}

export default Header