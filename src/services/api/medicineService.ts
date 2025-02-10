import apiClient from "./api";
import { Medicine, MedicineCreateForm, MedicinePrescription } from "./models";

export const fetchAllMedicines = async () => {
  try {
    const response = await apiClient.get("/medicine/all");
    return response.data;
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
};

export const createMedicine = async (medicineData: MedicineCreateForm) => {
  try {
    const response = await apiClient.post("/medicine", medicineData);
    return response.data;
  } catch (error: any) {
    console.error("Error creating medicine:", error);
    throw error;
  }
};

export const createMedicinePrescription = async (
  medicinePrescription: MedicinePrescription
) => {
  try {
    const response = await apiClient.post(
      "/medicine/prescription",
      medicinePrescription
    );
    return response.data;
  } catch (error: any) {
    console.error("Error creating medicine prescription:", error);
    throw error;
  }
};

export const getMedicinePrescription = async (medicalRecordId: number) => {
  try {
    const response = await apiClient.get(
      `/medicine/prescription/${medicalRecordId}`
    );
    return response.data;
  } catch (error: any) {
    console.error("Error getting medicine prescription:", error);
    throw error;
  }
};
