import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../globals'

// Register Component handles user registration.
const Register = ({ handleLoginSuccess }) => {
    const navigate = useNavigate()
    // State to manage form data
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password1: '',  
        password2: ''  // confirmation password field
    })

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault()
        
        try {
            // Make registration request to the server
            const response = await axios.post(`${BASE_URL}/dj-rest-auth/registration/`, formData)
            // Handle successful registration
            console.log(response.data)
            handleLoginSuccess(response.data)

            // Redirect to home page
            navigate('/')
        } catch (error) {
            // Handle registration error
            console.error('Registration failed', error)
        }
    }

    return (
      <div className='fixed w-full px-4 py-4 z-50'>
            <div className='max-w-[450px] h-[500px] mx-auto bg-gray-800 text-white rounded'>
                <div className='max-w-[320px] mx-auto py-16'>
                    <h1 className='text-3xl font-bold text-center'>Sign Up</h1>
                    <form 
                      className='w-full flex flex-col py-4'
                      onSubmit={handleSubmit}
                    >
                        {/* Input fields for username, email, and passwords */}
                        <input 
                        className='p-3 my-2 bg-gray-600 rounded'
                        placeholder="Enter a username"
                        type="text" 
                        name="username" 
                        value={formData.username} onChange={handleChange} 
                        />
                        <input 
                        className='p-3 my-2 bg-gray-600 rounded'
                        placeholder="Enter your email"
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} />
                        <input 
                        className='p-3 my-2 bg-gray-600 rounded'
                        placeholder="Enter a password"
                        type="password" 
                        name="password1" 
                        value={formData.password1} 
                        onChange={handleChange} />
                        <input 
                        className='p-3 my-2 bg-gray-600 rounded'
                        placeholder="Confirm password"
                        type="password" 
                        name="password2" 
                        value={formData.password2} 
                        onChange={handleChange} />
                        {/* Registration button */}
                        <button 
                        className='bg-red-600 py-3 my-6 rounded font-bold' 
                        type="submit">Register
                        </button>
                    </form>
                  </div>
            </div>               
        </div>
    )
}

export default Register