import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Logout from './Logout'
import Register from './Register'
import Favorites from './Favorites'


export default function Main({ isAuthenticated, handleLoginSuccess}) {
    return (
      <div className="routesContainer">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login handleLoginSuccess={handleLoginSuccess} />} />
          <Route path="/Logout" element={<Logout />} />
          <Route path="/Register" element={<Register handleLoginSuccess={handleLoginSuccess} />} />
          <Route path="/Favorites" element={<Favorites />} />
        </Routes>
      </div>
    )
  }
  