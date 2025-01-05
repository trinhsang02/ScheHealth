import apiClient from './api';
import { appointmentData, AppointmentResponse } from './models';

export const createAppointment = async (appointmentData: appointmentData): Promise<AppointmentResponse> => {
  try {
      const response = await apiClient.post<AppointmentResponse>('/appointment', appointmentData);
      return response.data;
  } catch (error: any) {
      throw error;
  }
};

