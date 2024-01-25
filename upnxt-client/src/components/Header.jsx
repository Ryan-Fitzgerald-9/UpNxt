import React from "react";
import Nav from './Nav'
import homeBg from '../assets/home2.png'

const Header = ({ isAuthenticated, username, handleLogout }) => {
    return (
        <header>
            {/* Navigation component with props */}
            <Nav
                isAuthenticated={isAuthenticated}
                username={username}
                handleLogout={handleLogout}
            />
            {/* Main header section with background image and text */}
            <div className="relative w-full h-[225px] text-white flex flex-col items-center justify-center">
                {/* Background image covering the entire header */}
                <div className="absolute inset-0 w-full h-full">
                    <img className="w-full h-full object-cover" src={homeBg} alt="background" />
                </div>
                {/* Gradient overlay for better text visibility */}
                <div className="absolute inset-0 w-full h-[250px] bg-gradient-to-b from-black/90 to-transparent"></div>
                {/* Header text */}
                <div className="text-center text-xl font-bold md:text-3xl z-20">The Movies You Love, All in One Place.</div>
            </div>
        </header>
    )
}

export default Header