import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import userReducer from '../slices/userSlice';
import studentReducer from '../slices/studentSlice';
import classReducer from '../slices/classSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    students: studentReducer,
    classes: classReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
