import React from "react";
import Nav from './Nav'
import homeBgTunnel from '../assets/home-bg-tunnel.png'

const Header = ({ isAuthenticated, username, handleLogout }) => {
    return (
        <header>
            
            <Nav
                isAuthenticated={isAuthenticated}
                username={username}
                handleLogout={handleLogout}
            />
            <div className="w-full h-[250px] text-white">
                <div className="w-full h-full">
                    <img className="w-full h-full object-cover" src={homeBgTunnel} alt="background" />
                </div>
            </div>
        </header>
    )
}

export default Header