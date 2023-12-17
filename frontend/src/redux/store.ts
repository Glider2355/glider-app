import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import campReducer from './features/campSlice';
import universityReducer from './features/universitySlice';
import userUniversityReducer from './features/userUniversitySlice';
import roleReducer from './features/roleSlice';
import userRoleReducer from './features/userRoleSlice';
import campParticipationReducer from './features/campParticipationSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    camp: campReducer,
    university: universityReducer,
    userUniversity: userUniversityReducer,
    role: roleReducer,
    userRole: userRoleReducer,
    campPrtification: campParticipationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
