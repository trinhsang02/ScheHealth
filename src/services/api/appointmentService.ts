import apiClient from "./api";
import { appointmentData } from "./models";
import authService from "./authService";

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

export const fetchAppointmentBySpecialityID = async () => {
  try {
    const response = await apiClient.get("/appointment/{speciality_id}");
    return response.data;
  } catch (error: any) {
    throw error;
  }
};
