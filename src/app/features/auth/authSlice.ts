import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import { AuthState } from './types';
import axios from '../../utils/axios';

export const login = createAsyncThunk('auth/login', async (credentials) => {
    await axios.get('sanctum/csrf-cookie');
    const response = await axios.post('auth/login', credentials);
    return response.data; // Assuming it returns { user, token }
});

export const logout = createAsyncThunk('auth/logout', async () => {

    await axios.post('auth/logout');
    return null;
});



const initialState: AuthState = {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
}

export const authState = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetAuthState(state) {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(logout.fulfilled, (state) => {
                state.isAuthenticated = false;
                state.user = null;
                state.token = null;
            });
    },
})

// Action creators are generated for each case reducer function
export const { resetAuthState } = authState.actions

export default authState.reducer