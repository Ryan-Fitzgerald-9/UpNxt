import React, { useState, useEffect } from "react"
import axios from 'axios'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import MoviePage from './MoviePage'

// Constants for API endpoints and keys
import { BASE_URL, POSTER_PATH, TMDB_API_KEY } from '../globals'



const Favorites = () => {
    // State variables using React hooks
    const [movies, setMovies] = useState([])
    const [selectedMovie, setSelectedMovie] = useState(null)
    const [userFavorites, setUserFavorites] = useState([])
    
    // Fetch movies and update state when userFavorites change
    useEffect(() => {
        const getMovies = async () => {
            const response = await axios.get(`${BASE_URL}/movies`)
            
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
            setMovies(moviesWithPosters);
        }
        getMovies()
    }, [userFavorites])

    // Show movie details when clicked
    const showMovieDetails = async (movie) => {
        // fetch TMDb poster path for the selected movie
        const tmdbResponse = await axios.get(
            `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(movie.title)}`
        )
        const tmdbPosterPath = tmdbResponse.data.results[0]?.poster_path
    
        // Set selectedMovie state with tmdbPosterPath
        setSelectedMovie({ ...movie, tmdbPosterPath })
    }

    // Close movie details
    const closeMovieDetails = () => {
        setSelectedMovie(null)
    }

    // Toggle favorite status for a movie
    const toggleFavorite = async (movieId) => {
        try {
            console.log(movieId)
            // Check if the movie is already in the user's favorites
            const token = localStorage.getItem('token')
            console.log(token)
            const isAlreadyFavorite = userFavorites.some((favorite) => favorite.movie === movieId);

            if (isAlreadyFavorite) {
                // Remove from favorites
                await axios.post(`${BASE_URL}/user-favorites/toggle/${movieId}`, { movie: movieId }, {
                    headers: {
                        'Authorization': `Token ${token}`,
                        'Content-Type': 'application/json',
                    }
                });
            } else {
                // Add to favorites
                await axios.post(`${BASE_URL}/user-favorites/toggle/${movieId}`, { movie: movieId }, {
                    headers: {
                        'Authorization': `Token ${token}`,
                        'Content-Type': 'application/json',
                    }
                });
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
    // Scroll the movie slider left
    const slideLeft = () => {
        let slider = document.getElementById('slider')
        slider.scrollLeft = slider.scrollLeft - 500
    }
    // Scroll the movie slider right
    const slideRight = () => {
        let slider = document.getElementById('slider')
        slider.scrollLeft = slider.scrollLeft + 500
    }


    return (
        
        <div>
            <h2 className="text-white text-xl font-bold md:text-3xl p-4">Favorites</h2>
            {Array.isArray(movies) && movies.length > 0 && movies.some((movie) => movie.reviews.length !== 0) ? (
                
                <div className="relative flex items-center group">
                    <MdKeyboardArrowLeft
                        onClick={slideLeft}
                        className="bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
                        size={40}
                    />
                    <div id={'slider'} className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative">
                        {movies
                            .filter((movie) => movie.reviews.length > 0)
                            .map((movie, key) => (
                                <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2" key={movie.id}>
                                    <img className="w-full h-auto block rounded" src={`${POSTER_PATH}${movie.tmdbPosterPath}`} alt={movie.title} />
                                    <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
                                        <div className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center flex-col">
                                            <p className="pb-2">{movie.title}</p>
                                            <p className="pb-2">IMDb Score: {movie.imdb_score}</p>
                                            <p className="pb-2">Available On: {movie.available_on}</p>
                                        </div>

                                        <p onClick={() => toggleFavorite(movie.id)}>
                                            {movie.reviews.length > 0 ? <FaHeart className="absolute top-4 left-4 text-red-600" /> : <FaRegHeart className="absolute top-4 left-4 text-gray-300" />}
                                        </p>

                                        <button className="w-[144px] sm:w-[184px] md:w-[224px] lg:w-[264px] bg-red-600 text-white p-2 z-20 absolute bottom-2 left-1/2 transform -translate-x-1/2 rounded" onClick={() => showMovieDetails(movie)}>
                                            Details
                                        </button>
                                    </div>
                                </div>
                            ))}
                    </div>
                    <MdKeyboardArrowRight
                        onClick={slideRight}
                        className="bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
                        size={40}
                    />
                </div>
            ) : (
                <h2>No favorites yet!</h2>
            )}
            {selectedMovie && <MoviePage movie={selectedMovie} onClose={closeMovieDetails} />}
        </div>
    );
}

export default Favorites;