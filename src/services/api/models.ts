export interface UserData {
  id: number;
  email: string;
  name: string;
  role: string;
  phone?: string;
  address?: string;
  avatar?: string;
  speciality_id?: number; // Cho bác sĩ
  birthday?: string;
}

export interface TokenData {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface LoginRequest {
  email: string;
  password: string;
  login_type: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: TokenData | null;
  user?: UserData;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  role: string;
  phone?: string;
  address?: string;
  speciality_id?: number; // Nếu đăng ký là bác sĩ
  birthday?: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  user?: UserData;
}

export interface PasswordResetRequest {
  email: string;
  // role: 'doctor' | 'patient';
  role: string;
}

export interface PasswordResetResponse {
  success: boolean;
  message: string;
}

export interface appointmentData {
  id: number;
  patient_id: number;
  patient_name: string;
  patient_birthday: string;
  patient_phone: string;
  patient_reason: string;
  speciality_id: number;
  numerical_order: number;
  date: string;
  status?: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
  doctor_id?: number;
  doctor_name?: string;
}

export interface specialityData {
  id: string;
  name: string;
  description: string;
  image: string;
  doctors_count?: number;
}

export interface PatientProfile {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  birthday: string;
  gender: string;
  avatar: string;
  created_at: string;
}
