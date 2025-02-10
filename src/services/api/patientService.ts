import apiClient from "./api";
import { PatientProfile, PasswordUpdateData } from "./models";

export const getPatientProfile = async (): Promise<PatientProfile> => {
  try {
    const response = await apiClient.get("/patient/self");
    if (response.data.success) {
      return response.data.data;
    }
    throw new Error(response.data.message || "Failed to fetch profile");
  } catch (error) {
    console.error("Failed to fetch patient profile:", error);
    throw new Error("Unable to fetch patient profile. Please try again later.");
  }
};

export const updatePatientProfile = async (
  updateData: Partial<PatientProfile>
): Promise<PatientProfile> => {
  try {
    const data = {
      name: updateData.name,
      phone: updateData.phone,
      email: updateData.email,
      birthday: updateData.birthday,
      gender: updateData.gender === "male" ? 0 : 1,
      address: updateData.address,
    };
    console.log("update data", data);
    const response = await apiClient.put(`/patient/${updateData.id}`, data);
    if (response.data.success) {
      return response.data.data;
    }
    throw new Error(response.data.message || "Failed to update profile");
  } catch (error: any) {
    console.error(
      "Failed to update patient profile:",
      error?.response?.data || error
    );
    throw new Error(
      "Unable to update patient profile. Please try again later."
    );
  }
};

export const getPatientById = async (id: number): Promise<PatientProfile> => {
  try {
    const response = await apiClient.get(`/patient/${id}`);
    if (response.data.success) {
      return response.data.data;
    }
    throw new Error(response.data.message || "Failed to fetch profile");
  } catch (error) {
    console.error("Failed to fetch patient profile:", error);
    throw new Error("Unable to fetch patient profile. Please try again later.");
  }
};

export const updatePassword = async (updateData: PasswordUpdateData): Promise<void> => {
  try {
    const response = await apiClient.put('/patient/password', updateData);
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to update password');
    }
  } catch (error: any) {
    console.error('Failed to update password:', error?.response?.data || error);
    if (error?.response?.data?.message === 'Current password is incorrect') {
      throw new Error('Mật khẩu hiện tại không chính xác');
    }
    throw new Error('Không thể đổi mật khẩu. Vui lòng thử lại sau.');
  }
};