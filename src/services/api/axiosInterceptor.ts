import apiClient from './api';
import { refreshToken } from './authService';

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Nếu lỗi 401 và chưa thử refresh token
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Thử refresh token
        const response = await refreshToken();
        if (response.success && response.data) {
          // Cập nhật token mới vào header
          apiClient.defaults.headers.common['Authorization'] = 
            `Bearer ${response.data.access_token}`;
          // Thử lại request ban đầu
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // Nếu refresh token thất bại, đăng xuất
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
