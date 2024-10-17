import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, {getCsrfCookie} from '../../utils/axios';
import { UserState } from "./types";

const initialState: UserState = {
    users: [],
    loading: false,
    error: null,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (page: number) => {
    const response = await axios.get(`/api/users?page=${page}`);
    return response.data;
});

export const addUser = createAsyncThunk('users/addUser', async (userData: { email: string; name: string; password: string; }) => {
    // await axios.get('/sanctum/csrf-cookie').then(response => {
    //     console.log(response.data._csrf);
    //     axios.defaults.headers.post['X-CSRF-Token'] = response.data._csrf;
    // });

    const cookie = await getCsrfCookie();
    // axios.defaults.headers.post['X-CSRF-Token'] = cookie;

    const response = await axios.post('/api/users', userData);
    return response.data;
});

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload.data;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch users';
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.users.push(action.payload);
            });
    },
});

export default userSlice.reducer;