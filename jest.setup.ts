import '@testing-library/jest-dom'; // Extends expect with custom matchers

// Mocking import.meta for environment variables
Object.defineProperty(global, 'import', {
  value: {
    meta: {
      env: {
        VITE_OMDB_API_KEY: '52c2949a',
        VITE_OMDB_BASE_URL: 'https://mock-api.com',
        VITE_MOVIE_POSTER: 'https://via.placeholder.com/180x260',
      },
    },
  },
});
