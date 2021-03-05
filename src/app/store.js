import { configureStore } from '@reduxjs/toolkit';
import dogsReducer from '../features/dogs/dogsSlice';

export default configureStore({
  reducer: {
    dogs: dogsReducer,
  },
});
