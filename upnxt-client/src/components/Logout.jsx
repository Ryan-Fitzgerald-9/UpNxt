import React  from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../globals'

const Logout = ({ handleLogoutSuccess }) => {
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/dj-rest-auth/logout/`, {})
            // handle successful logout
            console.log(response.data)
            handleLogoutSuccess()

            // redirect to home
            navigate('/')
        } catch (error) {
            // handle logout error
            console.error('Logout failed', error.response)
        }
    }

    return (
        <div>
            <button className="bg-red-600 px-6 py-2 rounded cursor-pointer text-white" onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Logout