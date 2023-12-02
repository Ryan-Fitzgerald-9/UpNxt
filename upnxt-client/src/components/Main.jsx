import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Logout from './Logout'
import Register from './Register'
// import MovieList from './MovieList'

export default function Main() {
    return (
      <div className="routesContainer">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Logout" element={<Logout />} />
          <Route path="/Register" element={<Register />} />
          {/* <Route path='/SearchResults' element={< SearchResults />} /> */}
          {/* <Route path="/MovieList" element={<MovieList />} /> */}

        </Routes>
      </div>
    );
  }
  