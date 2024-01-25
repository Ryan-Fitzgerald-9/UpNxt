import { useState, useEffect } from "react"
import axios from 'axios'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { BASE_URL, POSTER_PATH, TMDB_API_KEY } from '../globals'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import MoviePage from "./MoviePage"

const MovieList = () => {
    // Initialize state variables
    const [movies, setMovies] = useState([])
    const [selectedMovie, setSelectedMovie] = useState(null)
    const [userFavorites, setUserFavorites] = useState([])
    const [filters, setFilters] = useState({
        netflix: false,
        prime: false,
        apple: false,
        disney: false,
        max: false,
    })
    // Fetch movies and update state when userFavorites change
    useEffect(() => {
        const getMovies = async () => {
            const response = await axios.get(`${BASE_URL}/movies`)
            
            console.log(response)
            const moviesWithPosters = await Promise.all(
                response.data.map(async (movie) => {
                    const tmdbResponse = await axios.get(
                        `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(movie.title)}`
                    )
                    const tmdbPosterPath = tmdbResponse.data.results[0]?.poster_path

                    // Check if movie is user favorite
                    const isFavorite = userFavorites.some((favorite) => favorite.movie === movie.id)

                    return { ...movie, tmdbPosterPath, isFavorite }
                })
            )
            setMovies(moviesWithPosters)
        }
        getMovies()
    }, [userFavorites])

    const showMovieDetails = async (movie) => {
        // Fetch TMDb poster path for the selected movie
        const tmdbResponse = await axios.get(
            `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(movie.title)}`
        )
        const tmdbPosterPath = tmdbResponse.data.results[0]?.poster_path
    
        // Set selectedMovie state with tmdbPosterPath
        setSelectedMovie({ ...movie, tmdbPosterPath })
    }
    // Close the movie details modal
    const closeMovieDetails = () => {
        setSelectedMovie(null)
    }
    // Toggle movie as favorite
    const toggleFavorite = async (movieId) => {
        try {
            console.log(movieId)
            // Check if the movie is already in the user's favorites
            const token = localStorage.getItem('token')
            console.log(token)
            const isAlreadyFavorite = userFavorites.some((favorite) => favorite.movie === movieId);

            if (isAlreadyFavorite) {
                // Remove from favorites
                console.log('in favorites', movieId)
                await axios.post(`${BASE_URL}/user-favorites/toggle/${movieId}`, { movie: movieId }, {
                    headers: {
                        'Authorization': `Token ${token}`,
                        'Content-Type': 'application/json',
                    }
                });
            } else {
                console.log('not in favorites', movieId)
                // Add to favorites
                await axios.post(`${BASE_URL}/user-favorites/toggle/${movieId}`, { movie: movieId }, {
                    headers: {
                        'Authorization': `Token ${token}`,
                        'Content-Type': 'application/json',
                    }
                })
            }

            // Update userFavorites state
            const updatedFavorites = isAlreadyFavorite
                ? userFavorites.filter((favorite) => favorite.movie !== movieId)
                : [...userFavorites, { movie: movieId }]
            setUserFavorites(updatedFavorites)
        } catch (error) {
            console.error('Toggle favorite failed', error)
        }
    }
    // Scroll the movie list to the left
    const slideLeft = () => {
        let slider = document.getElementById('slider')
        slider.scrollLeft = slider.scrollLeft - 500
    }
    // Scroll the movie list to the right
    const slideRight = () => {
        let slider = document.getElementById('slider')
        slider.scrollLeft = slider.scrollLeft + 500
    }
    // Apply filters to movies
    const applyFilters = (movie) => {
        return (
            (filters.netflix && movie.available_on === 'Netflix') ||
            (filters.prime && movie.available_on === 'Prime') ||
            (filters.apple && movie.available_on === 'Apple TV+') ||
            (filters.disney && movie.available_on === 'Disney +') ||
            (filters.max && movie.available_on === 'Max') ||
            (!filters.netflix && !filters.prime && !filters.apple && !filters.disney && !filters.max)
        )
    }
    // Handle changes in filter checkboxes
    const handleFilterChange = (service) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [service]: !prevFilters[service],
        }))
    }

    return (
        
        <div>
            {/* Movie list header */}
            <h2 className="text-white text-xl font-bold md:text-3xl p-4">Popular Movies</h2>
            {/* Filter checkboxes */}
            <h5 className="text-red-600 font-bold md:text-xl pl-4">Please Select Your Subscriptions</h5>
            <div className="text-yellow-500 pb-3 space-x-2">
                <label className="p-4">
                    Netflix
                    <input className="ml-2" type="checkbox" checked={filters.netflix} onChange={() => handleFilterChange('netflix')} />
                </label>
                <label className="p-4">
                    Prime
                    <input className="ml-2" type="checkbox" checked={filters.prime} onChange={() => handleFilterChange('prime')} />
                </label>
                <label className="p-4">
                    Apple TV+
                    <input className="ml-2" type="checkbox" checked={filters.apple} onChange={() => handleFilterChange('apple')} />
                </label>
                <label className="p-4">
                    Disney +
                    <input className="ml-2" type="checkbox" checked={filters.disney} onChange={() => handleFilterChange('disney')} />
                </label>
                <label className="p-4">
                    Max
                    <input className="ml-2" type="checkbox" checked={filters.max} onChange={() => handleFilterChange('max')} />
                </label>
            </div>
                    {/* Movie list content */}
                    {movies.length === 0 ? (
                        <h2 >Loading Please Wait...</h2>
                    ) : (
                    <div className="relative flex items-center group">
                        {/* Scroll left arrow */}
                        <MdKeyboardArrowLeft 
                            onClick={slideLeft} 
                            className="bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block" 
                            size={40} />
                        {/* Movie slider */}
                        <div id={'slider'} className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative">
                        {movies
                            .filter((movie) => applyFilters(movie))
                            .map((movie, key) => (
                                <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2" key={movie.id}>
                                    <img className="w-full h-auto block rounded" src={`${POSTER_PATH}${movie.tmdbPosterPath}`} alt={movie.title} />
                                    <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
                                        <div className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center flex-col">
                                            <p className="pb-2">{movie.title}</p>
                                            <p className="pb-2">IMDb Score: {movie.imdb_score}</p>
                                            <p className="pb-2">Available On: {movie.available_on}</p>
                                        </div>
                                        {/* Favorite icon */}
                                        <p onClick={() => toggleFavorite(movie.id)}>
                                            {movie.reviews.length ? <FaHeart className="absolute top-4 left-4 text-red-600" /> : <FaRegHeart className="absolute top-4 left-4 text-gray-300" />}
                                        </p>
                                        {/* Details button */}
                                        <button className="w-[144px] sm:w-[184px] md:w-[224px] lg:w-[264px] bg-red-600 text-white p-2 z-20 absolute bottom-2 left-1/2 transform -translate-x-1/2 rounded" onClick={() => showMovieDetails(movie)}>
                                            Details
                                        </button>
                                    </div>
                                </div>
                            ))}
                    </div>
                    {/* Scroll right arrow */}
                    <MdKeyboardArrowRight
                        onClick={slideRight}
                        className="bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
                        size={40}
                    />
                </div>
            )}
            {/* Display selected movie details */}
            {selectedMovie && <MoviePage movie={selectedMovie} onClose={closeMovieDetails} />}
        </div>
    );
};

export default MovieList