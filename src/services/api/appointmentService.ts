import apiClient from "./api";
import { appointmentData, AppointmentHistoryResponse } from "./models";
import authService from "./authService";
import { AxiosResponse } from 'axios';

export const createAppointment = async (appointmentData: appointmentData) => {
  try {
    const response = await apiClient.post(`/appointment`, appointmentData);
    return response.data;
  } catch (error: any) {
    throw error; // Không bọc trong Error() mới
  }
};

export const fetchAppointmentOfPatient = async () => {
  try {
    const patientId = authService.getUserData()?.id;
    if (!patientId) return new Error("No patient ID found");

    const response = await apiClient.get(`/appointment/${patientId}`);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const fetchAppointmentBySpecialityID = async (specialityId: number) => {
  try {
    const token = authService.getToken();

    if (!token) {
      throw new Error('No authentication token found');
    }

    const response: AxiosResponse = await apiClient.get(`/appointment/specialty/${specialityId}`, {
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

export const updateAppointmentStatus = async (id: number) => {
  try {
    const token = authService.getToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response: AxiosResponse = await apiClient.put(`/appointment/status/${id}`,
      {
        status: 'paid'
      },
      // {
      //   headers: {
      //     'Authorization': `Bearer ${token}`,
      //     'Content-Type': 'application/json'
      //   }
      // }
    );

    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const fetchAppointmentHistory = async () => {
  try {
    const response = await apiClient.get("/appointment/history/self");
    return response.data.data;
  } catch (error: any) {
    console.error("Failed to fetch appointment history:", error);
    throw error;
  }
};

export const fetchMedicalRecord = async () => {
  try {
    const response = await apiClient.get("/medical-record/self");
    return response.data.data;
  } catch (error: any) {
    throw error;
  }
};
