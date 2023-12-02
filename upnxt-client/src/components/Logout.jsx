import React  from 'react'
import axios from 'axios'
import { BASE_URL } from '../globals'

const Logout = () => {
    const handleLogout = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/rest-auth/logout/`)
            // handle successful logout
            console.log(response.data)
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