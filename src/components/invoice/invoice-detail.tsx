import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Invoice {
    id: string;
    date: string;
    medicalRecordId: string;
    totalAmount: number;
    services: { name: string; price: number }[];
}

interface InvoiceDetailProps {
    invoice: Invoice
    onBack: () => void
}

interface Service {
    name: string;
    price: number; // Add other properties as needed
}

export function InvoiceDetail({ invoice, onBack }: InvoiceDetailProps) {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <div>
                    <p><strong>Ngày:</strong> {invoice.date}</p>
                    <p><strong>Mã Hồ Sơ Bệnh Án:</strong> {invoice.medicalRecordId}</p>
                    <p><strong>Tổng Giá:</strong> {invoice.totalAmount.toLocaleString('vi-VN')} VND</p>
                </div>
                <Button onClick={onBack}>Quay Lại</Button>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Dịch Vụ</TableHead>
                        <TableHead>Giá</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {invoice.services.map((service: Service, index: number) => (
                        <TableRow key={index}>
                            <TableCell>{service.name}</TableCell>
                            <TableCell>{service.price.toLocaleString('vi-VN')} VND</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

