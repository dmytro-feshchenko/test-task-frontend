interface User {
    id: number;
    login: string;
    role: string;
}

export interface UserState {
    users: User[];
    loading: boolean;
    error: string | null;
}