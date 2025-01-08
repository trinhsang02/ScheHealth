import api from "./api";
import apiClient from "./api";
import { Invoice, InvoiceResponse} from "./models";

export const invoiceService = {
    getSelfInvoices: async (): Promise<InvoiceResponse[]> => {
      const response = await apiClient.get(`/payment/self-invoices`);
      return response.data.data;
    },
  
    getInvoicesOfMedicalRecord: async (id: number): Promise<Invoice[]> => {
      const response = await apiClient.get(`/payment/invoices/${id}`);
      return response.data.data;
    },
  
    createInvoice: async (invoice: Omit<Invoice, 'id'>): Promise<void> => {
      await apiClient.post(`payment/invoices`, invoice);
    }
  };
  
  export default invoiceService;