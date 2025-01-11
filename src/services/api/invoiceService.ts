import apiClient from "./api";

export const createInvoice = async (invoiceData: any) => {
    try {
        const response = await apiClient.post('/payment/invoices', invoiceData);
        return response.data;
    } catch (error) {
        console.error('Error creating invoice:', error);
        throw error;
    }
}
