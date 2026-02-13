export interface User {
    _id: string;
    username: string;
    email: string;
    socialProvider?: string;
    socialId?: string;
}

export interface AuthResponse {
    message: string;
    token: string;
    user: User;
}

export interface ApiError {
    message: string;
    error?: string;
}
