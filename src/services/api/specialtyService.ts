import apiClient from './api';
import { specialityData } from './models';

export const fetchSpecialities = async () => {
    try {
        const response = await apiClient.get('/specialty/all'); 
        return response.data; 
    } catch (error) {
        console.error('Error fetching specialties:', error);
        throw error;
    }
};