import apiClient from "./api";
import {
  LoginRequest,
  RegisterRequest,
  PasswordResetRequest,
  LoginResponse,
  RegisterResponse,
  PasswordResetResponse,
  UserData,
} from "./models";

class AuthService {
  private static instance: AuthService;

  private constructor() { }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(
    email: string,
    password: string,
    role: string
  ): Promise<LoginResponse> {
    try {
      const response = await apiClient.post<LoginResponse>("/login", {
        email,
        password,
        login_type: role,
      });
      console.log("response login", JSON.stringify(response));
      console.log("Response data:", response.data);

      if (response.data.success) {
        this.setAuthData(response.data, role);
        if (role === "patient") {
          const userData = await apiClient.get("/patient/self");
          return userData.data;
        } else {
          const loginResponse = await apiClient.get("/doctor/self");
          return loginResponse.data;
        }
      }
    } catch (error: any) {
      console.error("Login error:", {
        message: error.message,
        status: error?.response?.status,
        data: error?.response?.data,
      });
      throw new Error(error?.response?.data?.message || "Đăng nhập thất bại");
    }
    throw new Error("Email hoặc mật khẩu không đúng");
  }

  async getRole(email: string): Promise<string> {
    try {
      const response = await apiClient.get(`/role/${email}`);
      return response.data;
    } catch (error: any) {
      console.error("Get role error:", {
        message: error.message,
        status: error?.response?.status,
        data: error?.response?.data,
      });
      throw new Error(
        error?.response?.data?.message || "Lỗi hệ thống, vui lòng thử lại sau"
      );
    }
  }

  async register(registerRequest: RegisterRequest): Promise<RegisterResponse> {
    try {
      const response = await apiClient.post<RegisterResponse>(
        "/register",
        registerRequest
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error?.response?.data?.message || "Đăng ký thất bại");
    }
  }

  async resetPassword(
    resetRequest: PasswordResetRequest
  ): Promise<PasswordResetResponse> {
    try {
      const response = await apiClient.post<PasswordResetResponse>(
        "/reset-password",
        resetRequest
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error?.response?.data?.message || "Đặt lại mật khẩu thất bại"
      );
    }
  }

  private setAuthData(response: LoginResponse, role: string): void {
    if (response.data?.access_token) {
      const token = response.data.access_token;
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  
      sessionStorage.setItem("accessToken", token);
      sessionStorage.setItem("userRole", role);
      sessionStorage.setItem(
        "tokenExpiry",
        (Date.now() + response.data.expires_in * 1000).toString()
      );
  
      // Lưu user data bao gồm speciality_id vào session storage
      if (response.user_data) {
        const userData = {
          id: response.user_data.id,
          name: response.user_data.name,
          role: response.user_data.role,
          speciality_id: response.user_data.speciality_id
        };
        sessionStorage.setItem("userData", JSON.stringify(userData));
      }
    }
  }

  logout(): void {
    delete apiClient.defaults.headers.common["Authorization"];
    sessionStorage.clear();
    // window.location.reload();
  }

  isAuthenticated(): boolean {
    const token = sessionStorage.getItem("accessToken");
    const expiry = sessionStorage.getItem("tokenExpiry");

    if (!token || !expiry) return false;
    return Date.now() < parseInt(expiry);
  }

  getDashboardRoute(): string {
    const userRole = this.getUserRole();
    switch (userRole) {
      case "doctor":
        return "/doctor/";
      case "patient":
        return "/patient/homepage";
      default:
        return "/";
    }
  }

  getUserRole(): string | null {
    return sessionStorage.getItem("userRole");
  }

  getUserData(): UserData | null {
    const userData = sessionStorage.getItem("userData");
    return userData ? JSON.parse(userData) : null;
  }

  getToken(): string | null {
    return sessionStorage.getItem("accessToken");
  }
}

export const authService = AuthService.getInstance();
export default authService;
