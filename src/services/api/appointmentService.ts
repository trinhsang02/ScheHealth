import apiClient from './api';
import { appointmentData } from './models';
import authService from './authService';
import { AxiosResponse } from 'axios';


export const createAppointment = async (appointmentData: appointmentData) => {
    try {
        const response = await apiClient.post(`/appointment`, appointmentData);
        return response.data;
    } catch (error: any) {
        throw error;
    }
};

export const fetchAppointmentOfPatient = async () => {
    try {
        const patientId = authService.getUserData()?.id; 
        if (!patientId) {
            throw new Error('No patient ID found');
        }

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

export const updateAppointmentStatus = async (id: number, status: string) => {
    try {
        const token = authService.getToken();
        if (!token) {
            throw new Error('No authentication token found');
        }

        const response: AxiosResponse = await apiClient.put(`/appointment/${id}/status`, 
            { status },
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