import { combineReducers, configureStore } from '@reduxjs/toolkit'

import usersReducer from './features/users/userSlice'
import authReducer from './features/auth/authSlice'

const rootReducer = combineReducers({
    auth: authReducer,
    users: usersReducer
})

export const setupStore = (preloadedState?: Partial<RootState>) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState
    })
}

const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

export default store;