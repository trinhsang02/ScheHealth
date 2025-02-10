import apiClient from "./api";
import { AxiosResponse } from 'axios';
import authService from "./authService";

// Định nghĩa interface cho medical record
export interface MedicalRecordData {
  appointment_id: number;
  patient_id: number;
  doctor_id: number;
  diagnosis?: string;
  payment_status?: number;
}

export interface MedicalRecordResponse {
  id: number;
  appointment_id: number;
  patient_id: number;
  doctor_id: number;
  diagnosis: string;
  payment_status: number;
  doctor_name: string;
  date: string;
}

// Tạo medical record mới
export const createMedicalRecord = async (data: MedicalRecordData) => {
  try {
    const token = authService.getToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response: AxiosResponse = await apiClient.post('/medical-record', data, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (error: any) {
    throw error;
  }
};

// Lấy medical record theo appointment ID
export const fetchExistingMedicalRecord = async (appointmentId: number): Promise<MedicalRecordResponse | null> => {
  try {
    const token = authService.getToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response: AxiosResponse = await apiClient.get(`/medical-record/appointment/${appointmentId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data.data;
  } catch (error: any) {
    console.error("Error fetching medical record:", error);
    return null;
  }
};

// Lấy medical records của patient hiện tại
export const fetchSelfMedicalRecords = async () => {
  try {
    const token = authService.getToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response: AxiosResponse = await apiClient.get('/medical-record/self', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (error: any) {
    throw error;
  }
};

// Cập nhật diagnosis cho medical record
export const updateMedicalRecordDiagnosis = async (id: number, diagnosis: string) => {
  try {
    const token = authService.getToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response: AxiosResponse = await apiClient.put(
      `/medical-record/diagnosis/${id}`,
      { diagnosis },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data;
  } catch (error: any) {
    throw error;
  }
};

// Cập nhật payment status cho medical record
export const updateMedicalRecordPaymentStatus = async (id: number) => {
  try {
    const token = authService.getToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response: AxiosResponse = await apiClient.put(
      `/medical-record/payment-status/${id}`,
      {},
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data;
  } catch (error: any) {
    throw error;
  }
};

interface VitalSign {
  medical_record_id: number;
  name: string;
  value: number;
  unit: string;
  additional_info?: string;
}

export const createVitalSign = async (vitalSign: VitalSign) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/medical-records/vital-signs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(vitalSign)
  });

  if (!response.ok) {
    throw new Error('Failed to create vital sign');
  }

  return response.json();
};