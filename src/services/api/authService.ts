import apiClient from './api';
import { LoginRequest, RegisterRequest, PasswordResetRequest, LoginResponse } from './models';

export const login = async (loginRequest: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await apiClient.post<LoginResponse>('/login', loginRequest);
    return response.data;
  } catch (error: any) {
    console.error('Login failed:', error?.response?.data?.message || error.message);
    throw new Error(error?.response?.data?.message || 'Login failed');
  }
};

export const register = async (registerRequest: RegisterRequest) => {
  const response = await apiClient.post('/register', registerRequest);
  return response.data;
};

export const resetPassword = async (resetRequest: PasswordResetRequest) => {
  const response = await apiClient.post('/reset-password', resetRequest);
  return response.data;
};