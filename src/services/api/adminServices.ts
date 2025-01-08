import apiClient from "./api";
import { Doctor, DoctorCreateForm } from "./models";

// Interface cho response
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

// Interface cho params tìm kiếm
interface DoctorSearchParams {
  search?: string;
  order_column?: string;
  order_dir?: string;
}

// Lấy danh sách bác sĩ với tìm kiếm và phân trang
export const fetchAllDoctors = async (params?: DoctorSearchParams) => {
  try {
    const response = await apiClient.get<ApiResponse<Doctor[]>>(
      "/admin/doctors",
      { params }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching doctors:", error);
    throw error;
  }
};

// Lấy chi tiết một bác sĩ
export const getDoctorById = async (id: number) => {
  try {
    const response = await apiClient.get<ApiResponse<Doctor>>(
      `/admin/doctors/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching doctor:", error);
    throw error;
  }
};

// Tạo bác sĩ mới
export const createDoctor = async (doctorData: DoctorCreateForm) => {
  try {
    const response = await apiClient.post(
      "auth/register-with-admin",
      doctorData
    );
    return response;
  } catch (error) {
    console.error("Error creating doctor:", error);
    throw error;
  }
};

// Cập nhật thông tin bác sĩ
export const updateDoctor = async (
  email: string,
  doctorData: Partial<Doctor>
) => {
  try {
    const response = await apiClient.put<ApiResponse<Doctor>>(
      `/admin/doctors/${email}`,
      doctorData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating doctor:", error);
    throw error;
  }
};

// Xóa bác sĩ
export const deleteDoctor = async (id: number) => {
  try {
    const response = await apiClient.delete<ApiResponse<void>>(
      `/admin/doctors/${id}`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error deleting doctor:", error);
    throw error;
  }
};
