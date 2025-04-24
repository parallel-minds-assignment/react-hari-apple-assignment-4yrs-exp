import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { omdbApiSlice } from '../redux/services/omdbApiSlice';
import { SkeletonCard } from '../components/SkeletonCard';
import { SearchInput } from '../features/search/SearchInput';

const store = configureStore({
    reducer: {
        [omdbApiSlice.reducerPath]: omdbApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(omdbApiSlice.middleware),
});

test('should display skeleton loader while fetching data', () => {
    render(
        <Provider store={store}>
            <SkeletonCard />
        </Provider>
    );
    const skeletons = screen.getAllByTestId('skeleton-card');
    expect(skeletons.length).toBeGreaterThan(0);
});

test('should display no results message when no data is found', () => {
    render(
      <Provider store={store}>
        <SearchInput />
      </Provider>
    );
    const noResultsMessage = screen.getByText(/No results found/i);
    expect(noResultsMessage).toBeInTheDocument();
  });
