import React, { useState, useEffect } from "react";
import axios from 'axios';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { BASE_URL, POSTER_PATH, TMDB_API_KEY } from '../globals';

const Favorites = () => {
    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        const getFavorites = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/user-favorites/`)
                setFavorites(response.data);
            } catch (error) {
                console.error('Failed to fetch favorites', error)
            }
        }

        getFavorites();
    }, [])

    const toggleFavorite = async (movieId) => {
        try {
            // Toggle favorite on the server
            await axios.post(`${BASE_URL}/user-favorites/toggle/`, { movie: movieId })

            // Update local state
            setFavorites((prevFavorites) =>
                prevFavorites.map((favorite) =>
                    favorite.movie === movieId ? { ...favorite, isFavorite: !favorite.isFavorite } : favorite
                )
            )
        } catch (error) {
            console.error('Toggle favorite failed', error)
        }
    }

    return (
        <div>
            <h2 className="text-white font-bold md:text-xl p-4">Favorites</h2>
            {favorites.length === 0 ? (
                <h2>No favorites yet!</h2>
            ) : (
                <div className="flex flex-wrap">
                    {favorites.map((favorite) => (
                        <div key={favorite.id} className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block relative p-2">
                            <img
                                className="w-full h-auto block"
                                src={`${POSTER_PATH}${favorite.tmdbPosterPath}`}
                                alt={favorite.title}
                            />
                            <div
                                className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white"
                                onClick={() => toggleFavorite(favorite.movie)}
                            >
                                <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
                                    {favorite.title}
                                </p>
                                {favorite.isFavorite ? (
                                    <FaHeart className="absolute top-4 left-4 text-red-600" />
                                ) : (
                                    <FaRegHeart className="absolute top-4 left-4 text-gray-300" />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Favorites