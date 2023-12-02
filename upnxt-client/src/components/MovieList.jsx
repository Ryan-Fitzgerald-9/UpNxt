import { useState, useEffect } from "react"
import axios from 'axios'
import { BASE_URL, POSTER_PATH, TMDB_API_KEY } from '../globals'
import { Card, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap'
import MoviePage from "./MoviePage"

const MovieList = () => {
    const [movies, setMovies] = useState([])
    const [selectedMovie, setSelectedMovie] = useState(null)

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

    return (
        <div>
            {movies.length === 0 ? (
                <h2 className="Loading">Loading Please Wait...</h2>
            ) : (
                <div className="card-list">
                    {movies.map((movie, key) => (
                        <Card className="card" key={movie.id} style={{width: '18rem'}}>
                            <img src={`${POSTER_PATH}${movie.tmdbPosterPath}`} alt={movie.title}/>
                            <CardBody className="overlay">
                                <CardTitle tag="h5">{movie.title}</CardTitle>
                                <CardSubtitle className="mb-2 text-muted" tag="h6">
                                    IMDb Score: {movie.imdb_score}
                                </CardSubtitle>
                                <Button onClick={() => showMovieDetails(movie)}>
                                    Details
                                </Button>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            )}
            {selectedMovie && (
                <MoviePage movie={selectedMovie} onClose={closeMovieDetails}/>
            )}
        </div>
    )
}

export default MovieList