import { Route, Routes } from 'react-router-dom'
import Home from './Home'
// import MovieList from './MovieList'

export default function Main() {
    return (
      <div className="routesContainer">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path='/SearchResults' element={< SearchResults />} /> */}
          {/* <Route path="/MovieList" element={<MovieList />} /> */}

        </Routes>
      </div>
    );
  }
  