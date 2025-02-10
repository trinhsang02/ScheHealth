import apiClient from "./api";
import { Invoice } from "./models";

export const createInvoice = async (invoiceData: Invoice) => {
  try {
    const response = await apiClient.post("/payment/invoices", invoiceData);
    return response.data;
  } catch (error) {
    console.log("Error creating invoice:", error);
    throw error;
  }
};
