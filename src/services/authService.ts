import axios from 'axios';
import { API_URL, API_TIMEOUT } from '../constants/Config';
import { AuthResponse } from '../types/auth';

const apiClient = axios.create({
    baseURL: API_URL,
    timeout: API_TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const registerUser = async (data: any): Promise<AuthResponse> => {
    const response = await apiClient.post('/register', data);
    return response.data;
};

export const loginUser = async (data: any): Promise<AuthResponse> => {
    const response = await apiClient.post('/login', data);
    return response.data;
};

export const forgotPassword = async (email: string) => {
    const response = await apiClient.post('/forgot-password', { email });
    return response.data;
};

export const verifyOtp = async (email: string, otp: string) => {
    const response = await apiClient.post('/verify-otp', { email, otp });
    return response.data;
};

export const resetPassword = async (token: string, password: string) => {
    const response = await apiClient.post(`/reset-password/${token}`, { password });
    return response.data;
};
