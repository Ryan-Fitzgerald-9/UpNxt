import React, { useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../globals'
import { useNavigate } from 'react-router-dom'


const Login = ({ handleLoginSuccess }) => {
    // Initialize necessary hooks and variables
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    // Handle the login form submission
    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            // Make a POST request to the login endpoint
            const response = await axios.post(`${BASE_URL}/dj-rest-auth/login/`, {
                username,
                password
            })
            // Log successful login data and trigger login success handler
            console.log(response.data)
            handleLoginSuccess(response.data)
            // Redirect to home page
            navigate('/')
        } catch (error) {
            // Handle login error
            console.error('Login failed', error)
        }
    }

    return (
        <div className='fixed w-full px-4 py-4 z-50'>
            <div className='max-w-[450px] h-[400px] mx-auto bg-gray-800 text-white rounded'>
                <div className='max-w-[320px] mx-auto py-16'>
                    <h1 className='text-3xl font-bold text-center'>Login</h1>
                    <form 
                        className='w-full flex flex-col py-4'
                        onSubmit={handleLogin}
                    >
                        {/* Input fields for username and password */}
                        <input 
                            className='p-3 my-2 bg-gray-600 rounded' 
                            id="upnxtUsername" 
                            placeholder="Enter username" 
                            type="text" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                        />
                        <input 
                            className='p-3 my-2 bg-gray-600 rounded' 
                            id="upnxtPassword" 
                            placeholder="Enter password" 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} />
                        {/* Login button */}
                        <button className='bg-red-600 py-3 my-6 rounded font-bold'>
                            Login
                        </button>
                    </form>
                </div>
            </div>               
        </div>
    )
}

export default Login