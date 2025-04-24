import { configureStore } from "@reduxjs/toolkit";
import { omdbApiSlice } from "./services/omdbApiSlice";

// Configure the Redux store
export const store = configureStore({
  reducer: {
    [omdbApiSlice.reducerPath]: omdbApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(omdbApiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

