import { user } from '@/shared/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    user: user | null;
}

const userFromLocalStorageString = localStorage.getItem('user');

const userFromLocalStorage = userFromLocalStorageString
    ? JSON.parse(userFromLocalStorageString)
    : null;

const initialState: AuthState = {
    user: userFromLocalStorage || null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<user>) => {
            state.user = action.payload;
            localStorage.setItem('token', '');
        },
        logout: (state) => {
            state.user = null;
            localStorage.setItem('token', '');
            localStorage.setItem('user', '');
        },
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
