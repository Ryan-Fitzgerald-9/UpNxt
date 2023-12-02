import { useState, useEffect } from "react";
import axios from 'axios'
import { BASE_URL, POSTER_PATH } from '../globals'
import { Card, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap'
import MoviePage from "./MoviePage"

export default function MovieList() {

    const [movies, setMovies] = useState([])
    const [selectedMovie, setSelectedMovie] = useState(null)

    useEffect(() => {
        const getMovies = async () => {
            const response = await axios.get(`${BASE_URL}/movies`)
            setMovies(response.data)
            console.log(response)
        }
        getMovies()
    }, [])

    const showMovieDetails = (movie) => {
        setSelectedMovie(movie)
    }

    const closeMovieDetails = (movie) => {
        setSelectedMovie(null)
    }

    return (
        <div>
            {movies.length === 0 ? (
                <h2 className="Loading">Loading Please Wait...</h2>
            ) : (
                <div className="card-list">
                    {movies.map((movie, key) => (
                        <Card className="card" key={movie._id} style={{width: '18rem'}}>
                            <img src={`${POSTER_PATH}${movie.backdrop_path}`} alt={movie.title}/>
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