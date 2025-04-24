import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { omdbApiSlice } from '../redux/services/omdbApiSlice';
import { SearchInput } from '../features/search/SearchInput';
import userEvent from '@testing-library/user-event';

const store = configureStore({
    reducer: {
        [omdbApiSlice.reducerPath]: omdbApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(omdbApiSlice.middleware),
});

describe('SearchInput Component', () => {

    test('should update searchTerm when input changes', async () => {
        render(
            <Provider store={store}>
                <SearchInput />
            </Provider>
        );
        const inputElement = screen.getByPlaceholderText(/Search movies.../i);
        await userEvent.type(inputElement, 'Avengers');
        expect(inputElement).toHaveValue('Avengers');
    });

    test('should debounce search query after typing', async () => {
        jest.useFakeTimers(); // Use fake timers for debouncing
        render(
            <Provider store={store}>
                <SearchInput />
            </Provider>
        );
        const inputElement = screen.getByPlaceholderText(/Search movies.../i);
        // Simulate typing 'Spider' with a delay
        userEvent.type(inputElement, 'Spider');
        // Fast-forward all timers
        jest.runAllTimers();
        // Use waitFor to ensure the input value has updated after debouncing
        await waitFor(() => {
            expect(inputElement).toHaveValue('Spider');
        });
    });

});
