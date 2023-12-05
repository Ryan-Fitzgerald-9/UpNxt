import { useState, useEffect } from "react"
import axios from 'axios'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { BASE_URL, POSTER_PATH, TMDB_API_KEY } from '../globals'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
// import MoviePage from "./MoviePage"

const MovieList = () => {
    const [movies, setMovies] = useState([])
    const [selectedMovie, setSelectedMovie] = useState(null)
    const [favorite, setFavorite] = useState(false)

    useEffect(() => {
        const getMovies = async () => {
            const response = await axios.get(`${BASE_URL}/movies`)
            const moviesWithPosters = await Promise.all(
                response.data.map(async (movie) => {
                    const tmdbResponse = await axios.get(
                        `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(movie.title)}`
                    )
                    const tmdbPosterPath = tmdbResponse.data.results[0]?.poster_path;
                    return { ...movie, tmdbPosterPath }
                })
            )
            setMovies(moviesWithPosters);
        }
        getMovies()
    }, [])

    const showMovieDetails = async (movie) => {
        // fetch TMDb poster path for the selected movie
        const tmdbResponse = await axios.get(
            `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(movie.title)}`
        )
        const tmdbPosterPath = tmdbResponse.data.results[0]?.poster_path
    
        // Set selectedMovie state with tmdbPosterPath
        setSelectedMovie({ ...movie, tmdbPosterPath })
    }

    const closeMovieDetails = () => {
        setSelectedMovie(null)
    }

    const slideLeft = () => {
        let slider = document.getElementById('slider')
        slider.scrollLeft = slider.scrollLeft - 500
    }

    const slideRight = () => {
        let slider = document.getElementById('slider')
        slider.scrollLeft = slider.scrollLeft + 500
    }

    return (
        
        <div>
            <h2 className="text-white font-bold md:text-xl p-4">Movies</h2>
                    {movies.length === 0 ? (
                        <h2 >Loading Please Wait...</h2>
                    ) : (
                    <div className="relative flex items-center group">
                        <MdKeyboardArrowLeft 
                            onClick={slideLeft} 
                            className="bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block" 
                            size={40} />
                        <div id={'slider'} className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative">
                            {movies.map((movie, key) => (
                                <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2" key={movie.id} >
                                    <img className="w-full h-auto block" src={`${POSTER_PATH}${movie.tmdbPosterPath}`} alt={movie.title}/>
                                    <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
                                        <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">{movie.title}</p>
                                        {/* <p >
                                            IMDb Score: {movie.imdb_score}
                                        </p> */}
                                        <p>
                                            {favorite ? <FaHeart className="absolute top-4 left-4 text-gray-300" /> : <FaRegHeart className="absolute top-4 left-4 text-gray-300" />}
                                        </p>
                                        {/* <button onClick={() => showMovieDetails(movie)}>
                                            Details
                                        </button> */}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <MdKeyboardArrowRight 
                            onClick={slideRight} 
                            className="bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block" 
                            size={40} />
                    </div>
                    )}
                    {/* {selectedMovie && (
                        <MoviePage movie={selectedMovie} onClose={closeMovieDetails}/>
                    )} */}
        </div>
    )
}

export default MovieList