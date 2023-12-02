import React from "react";
import { POSTER_PATH } from '../globals'
import './Overlay.css'


export default function MoviePage({ movie, onClose }) {
    return (
        <div className="card-details-overlay">
            <div className="card-details-content">
                <button className='close-button' onClick={onClose}>
                    Close X
                </button>
                <div className="details-container">
                    <img src={`${POSTER_PATH}${movie.tmdbPosterPath}`} alt={movie.title} />
                    <h3>{movie.title}</h3>
                    <p>{movie.genre} | {movie.length_in_mins} mins | {movie.release_date}</p>
                    <p>Director: {movie.director}</p>
                    <p>Actors: {movie.actors}</p>
                    <p>Available On: {movie.available_on}</p>
                    <p>IMDb Score: {movie.imdb_score}</p>
                    <p>Overview: {movie.overview}</p>
                </div>
            </div>
        </div>
    )
}