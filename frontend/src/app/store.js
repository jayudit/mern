import { configureStore } from '@reduxjs/toolkit';
//all reducers must be added to store.js
import authReducer from '../features/auth/authSlice';
import goalReducer from '../features/goals/goalSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalReducer,
  },
});
