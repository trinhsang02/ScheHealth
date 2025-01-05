import apiClient from './api';
import {
  RegisterRequest,
  PasswordResetRequest,
  LoginResponse,
  RegisterResponse,
  PasswordResetResponse,
  UserData
} from './models';

class AuthService {
  private static instance: AuthService;

  private constructor() {}

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      // Thử đăng nhập với tư cách bác sĩ
      const doctorResponse = await apiClient.post<LoginResponse>('/login', {
        email,
        password,
        login_type: 'doctor'
      });

      if (doctorResponse.data.success) {
        this.setAuthData(doctorResponse.data, 'doctor');
        return doctorResponse.data;
      }
    } catch (doctorError) {
      // Thử đăng nhập với tư cách bệnh nhân
      try {
        const patientResponse = await apiClient.post<LoginResponse>('/login', {
          email,
          password,
          login_type: 'patient'
        });

        if (patientResponse.data.success) {
          this.setAuthData(patientResponse.data, 'patient');
          return patientResponse.data;
        }
      } catch (patientError: any) {
        throw new Error(patientError?.response?.data?.message || 'Đăng nhập thất bại');
      }
    }

    throw new Error('Email hoặc mật khẩu không đúng');
  }

  async register(registerRequest: RegisterRequest): Promise<RegisterResponse> {
    try {
      const response = await apiClient.post<RegisterResponse>('/register', registerRequest);
      return response.data;
    } catch (error: any) {
      throw new Error(error?.response?.data?.message || 'Đăng ký thất bại');
    }
  }

  async resetPassword(resetRequest: PasswordResetRequest): Promise<PasswordResetResponse> {
    try {
      const response = await apiClient.post<PasswordResetResponse>('/reset-password', resetRequest);
      return response.data;
    } catch (error: any) {
      throw new Error(error?.response?.data?.message || 'Đặt lại mật khẩu thất bại');
    }
  }

  private setAuthData(response: LoginResponse, role: string): void {
    if (response.data?.access_token) {
      const token = response.data.access_token;
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      sessionStorage.setItem('accessToken', token);
      sessionStorage.setItem('userRole', role);
      sessionStorage.setItem('tokenExpiry', (Date.now() + response.data.expires_in * 1000).toString());
      
      if (response.user) {
        sessionStorage.setItem('userData', JSON.stringify(response.user));
      }
    }
  }

  logout(): void {
    delete apiClient.defaults.headers.common['Authorization'];
    sessionStorage.clear();
  }

  isAuthenticated(): boolean {
    const token = sessionStorage.getItem('accessToken');
    const expiry = sessionStorage.getItem('tokenExpiry');
    
    if (!token || !expiry) return false;
    return Date.now() < parseInt(expiry);
  }

  getDashboardRoute(): string {
    const userRole = this.getUserRole();
    switch (userRole) {
      case 'doctor':
        return '/doctor/';
      case 'patient':
        return '/patient/homepage';
      default:
        return '/login';
    }
  }

  getUserRole(): string | null {
    return sessionStorage.getItem('userRole');
  }

  getUserData(): UserData | null {
    const userData = sessionStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  }

  getToken(): string | null {
    return sessionStorage.getItem('accessToken');
  }
}

export const authService = AuthService.getInstance();
export default authService;
