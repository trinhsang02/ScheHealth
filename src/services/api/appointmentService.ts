import apiClient from './api';
import { appointmentData } from './models';

export const createAppointment = async (appointmentData: appointmentData) => {
    try {
        const response = await apiClient.post(`/appointments`, appointmentData);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.message || 'Failed to create appointment');
    }
};

// export const getAppointmentsOfPatient = async (patientId) => {
//     try {
//         const response = await apiClient.get(`/appointments/${patientId}`);
//         return response.data;
//     } catch (error) {
//         throw new Error(error.response.data.message || 'Failed to fetch appointments');
//     }
// };