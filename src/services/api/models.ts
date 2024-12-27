export interface LoginRequest {
    email: string;
    password: string;
    login_type: string;
  }
  
  export interface LoginResponse {
    success: boolean;
    message: string;
    data: {
      access_token: string;
      token_type: string;
      expires_in: number;
    } | null;
  }
  
  export interface RegisterRequest {
    email: string;
    password: string;
    name: string;
    role: string;
  }
  
  export interface PasswordResetRequest {
    email: string;
    role: string;
  }

  export interface appointmentData {
    id: string;
    patientId: string;
    doctorId: string;
    date: Date;
    status: string;
  }