import apiClient from './api';
import { PatientProfile } from './models';

export const getPatientProfile = async (): Promise<PatientProfile> => {
    try {
        const response = await apiClient.get('/patient/self');
        if (response.data.success) {
            return response.data.data;
        }
        throw new Error(response.data.message || 'Failed to fetch profile');
    } catch (error) {
        console.error('Failed to fetch patient profile:', error);
        throw new Error('Unable to fetch patient profile. Please try again later.');
    }
};

export const updatePatientProfile = async (updateData: Partial<PatientProfile>): Promise<PatientProfile> => {
    try {
        const response = await apiClient.put(`/patient/${updateData.id}`, updateData);
        if (response.data.success) {
            return response.data.data;
        }
        throw new Error(response.data.message || 'Failed to update profile');
    } catch (error: any) {
        console.error('Failed to update patient profile:', error?.response?.data || error);
        throw new Error('Unable to update patient profile. Please try again later.');
    }
};



