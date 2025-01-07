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
import React, { useState, useEffect } from "react";
import { fectchAllServices, createService } from "../../../services/api/service";
import { Service } from "../../../services/api/models";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";


const MedicalServicePage = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [newService, setNewService] = useState({
        name: "",
        price: "",
        description: "",
    });

    useEffect(() => {
        const loadServices = async () => {
            const data = await fectchAllServices();
            setServices(data.data);
        };
        loadServices();
    }, []);

    const handleAddNew = async (e: React.FormEvent) => {
        e.preventDefault();
        const serviceData = {
            name: newService.name,
            price: Number(newService.price),
            description: newService.description,
        };

        try {
            const response = await createService(serviceData);
            if (response.success) {
                setServices(prevServices => [...prevServices, response.data]);
                setIsOpen(false);
                setNewService({ name: "", price: "", description: "" });
            } else {
                console.error("Failed to add service:", response.message);
            }
        } catch (error) {
            console.error("Error adding service:", error);
        }
    };

    //Search function
    const containsSearchTerm = (text: string | undefined, term: string): boolean => {
        if (!text) return false;

        const normalizedText = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const normalizedTerm = term.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        const searchWords = normalizedTerm.split(/\s+/);

        return searchWords.some(word => normalizedText.includes(word));
    };

    const filteredServices = services.filter((service) => {
        if (!searchTerm) return true;

        return (
            containsSearchTerm(service?.name, searchTerm) ||
            containsSearchTerm(service?.description, searchTerm) ||
            service?.id?.toString().includes(searchTerm)
        );
    });

    return (
        <div className="flex flex-col">
            {/* Header Section */}
            <div className="border-b bg-white">
                <div className="flex h-16 items-center justify-between px-4">
                    <h1 className="text-lg font-semibold">Danh sách dịch vụ y tế</h1>
                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogTrigger asChild>
                            <Button size="sm" variant="system">
                                <Plus className="mr-2 h-4 w-4" />
                                Thêm mới
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Thêm dịch vụ mới</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleAddNew} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Tên dịch vụ</Label>
                                    <Input
                                        id="name"
                                        value={newService.name}
                                        onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="price">Giá (VNĐ)</Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        value={newService.price}
                                        onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="description">Mô tả</Label>
                                    <Input
                                        id="description"
                                        value={newService.description}
                                        onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="flex justify-end space-x-2">
                                    <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                                        Hủy
                                    </Button>
                                    <Button variant="system" type="submit">
                                        Lưu
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Search and Table Section */}
            <div className="p-4">
                {/* Search Input */}
                <div className="mb-4 flex items-center gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Tìm kiếm..."
                            className="pl-8"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="rounded-md border bg-white">
                    <Table>
                        <TableHeader className="bg-blue-100 ">
                            <TableRow>
                                <TableHead className="w-[20px] text-base font-bold text-black">Mã</TableHead>
                                <TableHead className="w-[250px] text-base font-bold text-black ">Tên</TableHead>
                                <TableHead className="w-[180px] text-center text-base font-bold text-black">Giá</TableHead>
                                <TableHead className="w-[350px] text-center text-base font-bold  text-black">Mô tả</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredServices.map((medicalService: Service) => (
                                <TableRow key={medicalService.id} className="">
                                    <TableCell className="font-medium text-base">{medicalService.id}</TableCell>
                                    <TableCell className="font-medium text-base">{medicalService.name}</TableCell>
                                    <TableCell className="text-center text-base">{medicalService.price} VNĐ</TableCell>
                                    <TableCell className="text-left text-base">{medicalService.description}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default MedicalServicePage;
