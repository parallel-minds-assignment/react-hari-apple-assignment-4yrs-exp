import React, { useState, lazy, Suspense, useCallback, useEffect } from 'react';
import { useSearchMoviesQuery } from '../../redux/services/omdbApiSlice';
import { SkeletonCard } from '../../components/SkeletonCard';
import { NoResults } from '../../components/NoResults';
import { useDebounce } from '../../hooks/useDebounce';

const MovieCard = lazy(() => import('../../components/MovieCard'));

interface MovieCardProps {
    Title?: string;
    Year?: string;
    imdbID: string;
    Type?: string;
    Poster?: string;
}

export const SearchInput: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const [allResults, setAllResults] = useState<MovieCardProps[]>([]);

    const { data, isFetching, isSuccess } = useSearchMoviesQuery(
        { searchTerm: query, page },
        { skip: !query }
    );

    const debouncedSetQuery = useDebounce((value: string) => {
        if (value.length >= 3) {
            setQuery(value);
            setPage(1);
            setAllResults([]);
        }
    }, 400);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^[a-zA-Z0-9 ]*$/.test(value) && value !== searchTerm) {
            setSearchTerm(value);
            debouncedSetQuery(value);
        }
    };

    useEffect(() => {
        if (isSuccess && data?.Search) {
            setAllResults((prev) => (page === 1 ? data.Search : [...prev, ...data.Search]));
        }
    }, [data, isSuccess, page]);

    const loaderRef = useCallback((node: HTMLDivElement | null) => {
        if (!node || isFetching) return;

        const observer = new IntersectionObserver(
            (entries: any) => {
                if (entries[0].isIntersecting && data?.Search?.length > 0) {
                    setPage((prev) => prev + 1);
                }
            },
            { rootMargin: '200px' }
        );

        observer.observe(node);

        return () => observer.disconnect();
    }, [isFetching, data?.Search?.length]);

    return (
        <div className="search-container">
            <div className="search-sticky">
                <h1 className='apple-gradient-text'>
                    <img src="/movie-media.svg" alt="Movie" className="icon-inline" /> Instant Movie Search
                </h1>
                <div className="search-bar-wrapper">
                    <input
                        type="text"
                        placeholder="Search movies..."
                        value={searchTerm}
                        onChange={handleChange}
                        className="search-input"
                    />
                </div>
            </div>

            <div className="grid-results">
                {allResults.length > 0 ? (
                    <Suspense
                        fallback={Array.from({ length: 8 }).map((_, index) => (
                            <SkeletonCard key={index} />
                        ))}
                    >
                        {allResults.map((movie: MovieCardProps) => (
                            <MovieCard key={movie.imdbID} movie={movie} />
                        ))}
                    </Suspense>
                ) : !isFetching ? (
                    <NoResults />
                ) : (
                    Array.from({ length: 8 }).map((_, index) => <SkeletonCard key={index} />)
                )}

                {/* Infinite scroll loader */}
                {allResults.length > 0 && <div ref={loaderRef} data-testid="loading-trigger" className="loading-trigger" />}
                {isFetching && <p className="loading">Loading more...</p>}
            </div>
        </div>
    );
};
