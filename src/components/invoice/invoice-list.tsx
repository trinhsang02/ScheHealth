import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

interface Invoice {
    id: string;
    date: string;
    medicalRecordId: string;
    totalAmount: number;
    services: { name: string; price: number }[];
}

interface InvoiceListProps {
    onSelectInvoice: (invoice: Invoice) => void;
}

export function InvoiceList({ onSelectInvoice }: InvoiceListProps) {
    // This is mock data. In a real application, you would fetch this from an API
    const invoices: Invoice[] = [
        {
            id: '1',
            date: '2023-03-15',
            medicalRecordId: 'MR001',
            totalAmount: 1500000,
            services: [
                { name: 'Khám tổng quát', price: 500000 },
                { name: 'Xét nghiệm máu', price: 1000000 },
            ]
        },
        {
            id: '2',
            date: '2023-03-16',
            medicalRecordId: 'MR002',
            totalAmount: 2000000,
            services: [
                { name: 'Chụp X-quang', price: 800000 },
                { name: 'Khám chuyên khoa', price: 1200000 },
            ]
        },
        // Add more mock invoices as needed
    ]

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Ngày</TableHead>
                    <TableHead>Mã Hồ Sơ Bệnh Án</TableHead>
                    <TableHead>Tổng Giá</TableHead>
                    <TableHead>Hành Động</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                        <TableCell>{invoice.date}</TableCell>
                        <TableCell>{invoice.medicalRecordId}</TableCell>
                        <TableCell>{invoice.totalAmount.toLocaleString('vi-VN')} VND</TableCell>
                        <TableCell>
                            <Button variant="outline" onClick={() => onSelectInvoice(invoice)}>
                                Xem Chi Tiết
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

