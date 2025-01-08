import { StringToBoolean } from "class-variance-authority/types";

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
  user_data: UserData | null; 
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
  id?: number;
  patient_id: number;
  patient_name: string;
  patient_birthday: string;
  patient_phone: string;
  patient_reason: string;
  speciality_id: number;
  date: string;
  status?: "pending" | "approved" | "cancelled";
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

export interface Service {
  id: number;
  name: string;
  description?: string;
  price?: number;
}

export interface ServiceCreateForm {
  name: string;
  description?: string;
  price?: number;
}

export interface Medicine {
  id: number;
  name: string;
  description?: string;
  price?: number;
  unit: string;
  manufacture_date: string;
  expiry_date: string;
  side_effects: string;
  dosage: string;
}

export interface MedicineCreateForm {
  name: string;
  description?: string;
  price?: number;
  unit: string;
  manufacture_date: string;
  expiry_date: string;
  side_effects: string;
  dosage: string;
}

export interface AppointmentHistoryResponse {
  id: number;
  appointment_time: string;
  date: string;
  numerical_order: number;
  status: string;
  speciality_name?: string;
}

export interface MedicalRecord {
  id: number;
  appointment_id?: string;
  date: string;
  diagnosis: string;
  doctor_name: string;
  payment_status: number;
}

//Admin models
export interface Doctor {
  id: number;
  email: string;
  phone: string;
  name: string;
  description?: string;
  role: string;
  avatar?: string;
  speciality_id: number;
  room_id?: number;
  speciality?: string;  // Tên chuyên khoa - có thể được join từ bảng specialty
}

export interface DoctorCreateForm {
  email: string;
  phone: string;
  name: string;
  description?: string;
  role: string;
  avatar?: string;
  speciality_id: number;
  room_id?: number;
}
