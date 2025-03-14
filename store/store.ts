import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../services/authSlice';
import muscleGroupsSlice from '../services/muscleGroupsSlice';
import exercisesSlice from '../services/exercisesSlice';



const store = configureStore({
  reducer: {
    auth: authSlice,
    muscleGroup: muscleGroupsSlice,
    exercises: exercisesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>; 
export type AppDispatch = typeof store.dispatch;

export default store;
