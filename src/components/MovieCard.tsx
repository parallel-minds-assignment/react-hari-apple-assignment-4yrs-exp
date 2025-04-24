// components/MovieCard.tsx
import React, { useState } from 'react';
import { useGetMovieByIdQuery } from '../redux/services/omdbApiSlice';

interface MovieCardProps {
    movie: {
        Title?: string
        Year?: string
        imdbID: string
        Type?: string
        Poster?: string
    }
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {

    const [showDetails, setShowDetails] = useState<boolean>(false);
    const [detailsLoaded, setDetailsLoaded] = useState<boolean>(false);

    const { data: details } = useGetMovieByIdQuery(movie.imdbID, { skip: !detailsLoaded });
    const MOVIE_POSTER = import.meta.env.VITE_MOVIE_POSTER;

    const handleShowDetails = () => {
        if (!detailsLoaded) {
            setDetailsLoaded(true);
        }
        setShowDetails(true);
    };

    const handleHideDetails = () => {
        setShowDetails(false);
    };

    return (
        <div
            data-testid="movie-card"
            className="movie-card"
            onMouseEnter={handleShowDetails}
            onMouseLeave={handleHideDetails}
            onClick={() => {
                if (!showDetails) handleShowDetails();
                else handleHideDetails();
            }}
        >
            <div className="movie-card-image-container">
                <img
                    src={movie.Poster !== 'N/A' ? movie.Poster : MOVIE_POSTER}
                    alt={movie.Title}
                    className="movie-card-image"
                />
            </div>

            <div className="movie-card-content">
                <h3 className="movie-card-title">{movie.Title}</h3>
                <p className="movie-card-type">Type: {movie.Type}</p>
            </div>

            {details && (
                <div className={`movie-card-details ${showDetails ? 'show' : ''}`} onClick={() => setShowDetails(false)}>
                    <h3 className="movie-card-details-title">{movie.Title}</h3>
                    <p><strong>Year:</strong> {details.Year}</p>
                    <p><strong>Director:</strong> {details.Director}</p>
                    <p><strong>Rating:</strong> {details.imdbRating}</p>
                    <p><strong>Genre:</strong> {details.Genre}</p>
                    <p className="movie-card-plot">
                        <strong>Plot:</strong> {details.Plot}
                    </p>
                </div>
            )}
        </div>
    );
};

export default MovieCard;
