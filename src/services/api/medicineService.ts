import apiClient from "./api";
import { Medicine, MedicineCreateForm  } from "./models";

export const fetchAllMedicines =  async () => {
    try {
        const response = await apiClient.get('/medicine/all');
        return response.data;
    } catch (error) {
        console.error('Error fetching services:', error);
        throw error;
    }
}

export const createMedicine = async (medicineData: MedicineCreateForm) => {
    try{
        const response = await apiClient.post('/medicine', medicineData);
        return response.data;
    } catch (error: any){
        console.error('Error creating medicine:', error);
        throw error;
    }
}

