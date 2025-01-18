import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reduxSlices/authSlice'
import budgetReducer from './reduxSlices/budgetSlice'
export const store = configureStore({
    reducer: {
        auth: authReducer,
        budget: budgetReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

//state getters

export const getUser = (state: RootState) => state.auth.user;
export const getBudget = (state: RootState) => state.budget;