import React  from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../globals'

const Logout = () => {
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/dj-rest-auth/logout/`)
            // handle successful logout
            console.log(response.data)
            // handleLogoutSuccess()

            // redirect to home
            navigate('/')
        } catch (error) {
            // handle logout error
            console.error('Logout failed', error)
        }
    }

    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Logout