import apiClient from './api';
import { appointmentData } from './models';

export const createAppointment = async (appointmentData: appointmentData) => {
    try {
        const response = await apiClient.post(`/appointment`, appointmentData);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.message || 'Failed to create appointment');
    }
};
