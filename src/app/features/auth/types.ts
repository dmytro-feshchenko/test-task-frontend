export interface AuthState {
    user: Object | null,
    token: string | null,
    isAuthenticated: boolean,
    loading: boolean,
    error?: string | null,
}