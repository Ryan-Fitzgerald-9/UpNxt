import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../globals'
// import { Form, FormGroup, Label, Input, Button } from 'reactstrap'

const Register = ({ handleLoginSuccess }) => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password1: '',  
        password2: ''  // confirmation password field
    })

    const handleChange = (e) => {
        // console.log('handleChange called')
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        try {
            const response = await axios.post(`${BASE_URL}/dj-rest-auth/registration/`, formData)
            // handle successful registration
            console.log(response.data)
            handleLoginSuccess(response.data)

            // redirect to home
            navigate('/')
        } catch (error) {
            // handle registration error
            console.error('Registration failed', error)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input type="text" name="username" value={formData.username} onChange={handleChange} />
          </label>
          <br />
          <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </label>
          <br />
          <label>
            Password:
            <input type="password" name="password1" value={formData.password1} onChange={handleChange} />
          </label>
          <br />
          <label>
            Confirm Password:
            <input type="password" name="password2" value={formData.password2} onChange={handleChange} />
          </label>
          <br />
          <button type="submit">Register</button>
        </form>
    )
}

export default Register