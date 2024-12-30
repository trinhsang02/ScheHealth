import apiClient from './api';
import { specialtyData } from './models';

export const fetchSpecialties = async () => {
    try {
        const response = await apiClient.get('/specialty/all'); 
        return response.data; 
    } catch (error) {
        console.error('Error fetching specialties:', error);
        throw error;
    }
};