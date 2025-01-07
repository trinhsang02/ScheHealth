import apiClient from "./api";
import { ServiceCreateForm } from "./models";

export const fectchAllServices =  async () => {
    try {
        const response = await apiClient.get('/service/all');
        console.log("asdasdasda", response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching services:', error);
        throw error;
    }
}

export const createService = async (serviceData: ServiceCreateForm) => {
    try{
        const response = await apiClient.post( '/service', serviceData);
        return response.data;
    } catch (error: any){
        throw error;
    }
}

export const fetchServiceByID = async (id : number) => {
    try {
        const response = await apiClient.get('/service/{id}');
        return response.data;
    } catch (error: any) {
        throw error;
    }
}