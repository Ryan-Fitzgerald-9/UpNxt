import React, { useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../globals'
import { useNavigate } from 'react-router-dom'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'

const Login = ({ handleLoginSuccess }) => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async () => {
        try {
            
            const response = await axios.post(`${BASE_URL}/dj-rest-auth/login/`, {
                username,
                password
            })
            // handle successful login
            // console.log(response.data)
            handleLoginSuccess(response.data)

            // redirect to home
            navigate('/')
        } catch (error) {
            // handle login error
            console.error('Login failed', error)
        }
    }

    return (
        <Form>
            <FormGroup>
                <Label
                for="upnxtUsername"
                hidden
                >
                Username
                </Label>
                <Input id="upnxtUsername" placeholder="Enter username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </FormGroup>
            {' '}
            <FormGroup>
                <Label
                for="upnxtPassword"
                hidden
                >
                Password
                </Label>
                <Input id="upnxtPassword" placeholder="Enter password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </FormGroup>
            {' '}
            <Button onClick={handleLogin}>
                Login
            </Button>
        </Form>
    )
}

export default Login