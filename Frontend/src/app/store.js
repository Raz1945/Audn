import { configureStore } from '@reduxjs/toolkit';
import emailReducer from './features/emailSlice';
import userReducer from './features/userSlice';
import passwordReducer from './features/passwordSlice';

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
