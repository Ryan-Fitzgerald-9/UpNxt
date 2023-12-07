import React from "react";
import { POSTER_PATH } from '../globals'
import './Overlay.css'


export default function MoviePage({ movie, onClose }) {
    return (
        <div className="card-details-overlay">
            <div className="card-details-content">
                
                <div className="details-container">
                    <button className='close-button' onClick={onClose}>
                        X
                    </button>
                    <img src={`${POSTER_PATH}${movie.tmdbPosterPath}`} alt={movie.title} />
                    <h2>{movie.title}</h2>
                    <p className="text-yellow-600">{movie.genre} | {movie.length_in_mins} mins | {movie.release_date}</p>
                    <p>Director: {movie.director}</p>
                    <p>Actors: {movie.actors}</p>
                    <p className="text-yellow-600">Available On: {movie.available_on}</p>
                    <p className="text-yellow-600">IMDb Score: {movie.imdb_score}</p>
                    <p>Overview: {movie.overview}</p>
                </div>
            </div>
        </div>
    )
}