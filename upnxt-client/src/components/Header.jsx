import React from "react";
import Nav from './Nav'
import homeBg from '../assets/home3.png'

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
                    <img className="w-full h-full object-cover" src={homeBg} alt="background" />
                </div>
                <div className="absolute inset-0 w-full h-[250px] bg-gradient-to-b from-black/60 to-transparent"></div>
            </div>
        </header>
    )
}

export default Header