import apiClient from './api';
import { specialtyData } from './models';

export const fetchSpecialties = async () => {
    try {
        const response = await apiClient.get('/specialty'); 
        return response.data; 
    } catch (error) {
        throw new Error('Failed to fetch specialties');
    }
};