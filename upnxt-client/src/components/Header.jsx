import React from "react";
import Nav from './Nav'
import homeBg from '../assets/home2.png'

const Header = ({ isAuthenticated, username, handleLogout }) => {
    return (
        <header>
            <Nav
                isAuthenticated={isAuthenticated}
                username={username}
                handleLogout={handleLogout}
            />
            <div className="relative w-full h-[225px] text-white flex flex-col items-center justify-center">
                <div className="absolute inset-0 w-full h-full">
                    <img className="w-full h-full object-cover" src={homeBg} alt="background" />
                </div>
                <div className="absolute inset-0 w-full h-[250px] bg-gradient-to-b from-black/90 to-transparent"></div>
                <div className="text-center text-xl font-bold md:text-3xl z-20">The Movies You Love, All in One Place.</div>
            </div>
        </header>
    )
}

export default Header