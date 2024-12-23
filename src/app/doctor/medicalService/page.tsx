"use client";

import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search, Plus, MoreVertical } from "lucide-react";
import React from "react";

// Sample data - replace with actual data from your backend
const initialMedicines = [
    { id: 123, name: "Paradon", type: "Sủi", unit: "Vỉ", price: "100.000 VNĐ" },
    { id: 124, name: "Paradon", type: "Viên nén", unit: "Viên", price: "100.000 VNĐ" },
    { id: 125, name: "Paradon", type: "Viên nén", unit: "Vỉ", price: "100.000 VNĐ" },
    { id: 126, name: "Vitamin C", type: "Viên nén", unit: "Vỉ", price: "100.000 VNĐ" },
    { id: 127, name: "Vitamin C", type: "Viên nén", unit: "Vỉ", price: "100.000 VNĐ" },
    { id: 128, name: "Vitamin C", type: "Viên nhộng", unit: "Vỉ", price: "100.000 VNĐ" },
    { id: 129, name: "Vitamin C", type: "Dạng nước", unit: "Vỉ", price: "100.000 VNĐ" },
    { id: 130, name: "Vitamin C", type: "Siro", unit: "Vỉ", price: "100.000 VNĐ" },
];

const MedicinesPage = () => {
    const [medicines, setMedicines] = React.useState(initialMedicines);

    return (
        <div className="flex flex-col">
            {/* Header Section */}
            <div className="border-b bg-white">
                <div className="flex h-16 items-center justify-between px-4">
                    <h1 className="text-lg font-semibold">Danh sách thuốc</h1>
                    <Button size="sm" variant="system">
                        <Plus className="mr-2 h-4 w-4" />
                        Thêm mới
                    </Button>
                </div>
            </div>

            {/* Search and Table Section */}
            <div className="p-4">
                {/* Search Input */}
                <div className="mb-4 flex items-center gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Tìm kiếm..." className="pl-8" />
                    </div>
                </div>

                {/* Table */}
                <div className="rounded-md border bg-white">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[80px]">Mã</TableHead>
                                <TableHead className="w-[200px]">Tên</TableHead>
                                <TableHead className="w-[150px] text-center">Loại</TableHead>
                                <TableHead className="w-[100px] text-center">Đơn vị</TableHead>
                                <TableHead className="w-[100px] text-right">Giá</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {medicines.map((medicine) => (
                                <TableRow key={medicine.id}>
                                    <TableCell className="font-medium">{medicine.id}</TableCell>
                                    <TableCell>{medicine.name}</TableCell>
                                    <TableCell className="text-center">{medicine.type}</TableCell>
                                    <TableCell className="text-center">{medicine.unit}</TableCell>
                                    <TableCell className="text-right">{medicine.price}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* Pagination */}
            <div className="mt-4 flex justify-between items-center">
                <span>274 kết quả</span>
                <div className="flex items-center gap-2">
                    <button
                        className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm"
                    >
                        Trước
                    </button>

                    {[1, 2, 3, "...", 24].map((page, index) => (
                        <button key={index} className="p-2">
                            {page}
                        </button>
                    ))}

                    <button
                        className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm"
                    >
                        Sau
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MedicinesPage;
