import { configureStore } from '@reduxjs/toolkit';
import emailReducer from './slices/emailSlice';
import userReducer from './slices/userSlice';
import passwordReducer from './slices/passwordSlice';

// creamos el store usando la función configureStore
export const store = configureStore({
  // le pasamos un objeto con la propiedad reducer
  reducer: {
    email: emailReducer,
    user: userReducer,
    password: passwordReducer,
    // otros reducers
  },
});
