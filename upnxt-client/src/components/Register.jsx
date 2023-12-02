import React, { useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../globals'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password1: '',  
        password2: ''  // confirmation password field
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async () => {
        e.preventDefault()
        
        try {
            const response = await axios.post(`${BASE_URL}/rest-auth/registration/`, formData)
            // handle successful registration
            console.log(response.data)
        } catch (error) {
            // handle registration error
            console.error('Registration failed', error)
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label
                for="upnxtUsername"
                hidden
                >
                Username
                </Label>
                <Input id="upnxtUsername" placeholder="Enter username" type="text" value={formData.username} onChange={handleChange} />
            </FormGroup>
            {' '}
            <FormGroup>
                <Label
                for="upnxtEmail"
                hidden
                >
                Email
                </Label>
                <Input id="upnxtEmail" placeholder="Enter your email" type="text" value={formData.email} onChange={handleChange} />
            </FormGroup>
            {' '}
            <FormGroup>
                <Label
                for="upnxtPassword1"
                hidden
                >
                Password
                </Label>
                <Input id="upnxtPassword1" placeholder="Enter password" type="password" value={formData.password1} onChange={handleChange} />
            </FormGroup>
            {' '}
            <FormGroup>
                <Label
                for="upnxtPassword2"
                hidden
                >
                Confirm Password
                </Label>
                <Input id="upnxtPassword2" placeholder="Confirm password" type="password" value={formData.password2} onChange={handleChange} />
            </FormGroup>
            {' '}
            <Button type='submit'>
                Create Account
            </Button>
        </Form>
    )
}

export default Register