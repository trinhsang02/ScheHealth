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

export const getSpecialtyById = async (id: number) => {
    try {
        const response = await apiClient.get(`/specialty/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching specialty with ID ${id}:`, error);
        throw error;
    }
};