import apiClient from "./api";

export interface PasswordUpdateData {
  email: string;
  current_password: string;
  new_password: string;
}

export const updatePassword = async (updateData: PasswordUpdateData): Promise<void> => {
  try {
    const response = await apiClient.put('/auth/update-password', updateData);
    
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to update password');
    }
    
    return response.data;
  } catch (error: any) {
    console.error('Password update error:', error.response?.data || error);

    // Handle specific error cases
    if (error.response?.status === 401) {
      throw new Error('Mật khẩu hiện tại không chính xác');
    }
    
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }

    throw new Error('Không thể đổi mật khẩu. Vui lòng thử lại sau.');
  }
};