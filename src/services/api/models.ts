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
    patient_id: number;
    patient_name: string;
    patient_birthday: string;
    patient_phone: string;
    patient_reason: string;
    speciality_id: number;
    date: string;
  }

  export interface specialtyData{
    id: string;
    name: string;
    description: string;
    image: string;
  }