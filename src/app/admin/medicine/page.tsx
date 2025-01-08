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
import React, { useEffect, useState } from "react";
import {
  fetchAllMedicines,
  createMedicine,
} from "../../../services/api/medicineService";
import { AddMedicineModal } from "../addMedicineModal";
import { MedicineCreateForm } from "@/services/api/models";

interface Medication {
  id: number;
  name: string;
  description: string;
  price: number;
  unit: string;
  manufacture_date: string;
  expiry_date: string;
  side_effects: string;
  dosage: string;
}

const MedicinesPage = () => {
  const [medicines, setMedicines] = React.useState<Medication[]>([]);
  const [medications, setMedications] = useState<Medication[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadMedications = async () => {
      try {
        const data = await fetchAllMedicines();
        setMedications(data);
        setMedicines(data);
      } catch (error) {
        console.error("Error fetching medications:", error);
      }
    };
    loadMedications();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveMedicine = async (data: MedicineCreateForm) => {
    try {
      const newMedicine = await createMedicine(data);
      setMedicines((prev) => [...prev, newMedicine]);
      handleCloseModal();
    } catch (error) {
      console.error("Error saving medicine:", error);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Header Section */}
      <div className="border-b bg-white">
        <div className="flex h-16 items-center justify-between px-4">
          <h1 className="text-lg font-semibold">Danh sách thuốc</h1>
          <Button size="sm" variant="system" onClick={handleOpenModal}>
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
                <TableHead className="w-[80px]">Mã thuốc</TableHead>
                <TableHead className="w-[200px]">Tên thuốc</TableHead>
                <TableHead className="w-[100px] text-left">Đơn vị</TableHead>
                <TableHead className="w-[300px] text-left">Mô tả</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {medicines
                .sort((a, b) => a.id - b.id)
                .map((medicine) => (
                  <TableRow key={medicine.id}>
                    <TableCell className="font-medium">{medicine.id}</TableCell>
                    <TableCell className="text-left">{medicine.name}</TableCell>
                    <TableCell className="text-left">{medicine.unit}</TableCell>
                    <TableCell className="text-left">
                      {medicine.description}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Modal để thêm thuốc mới */}
      <AddMedicineModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveMedicine}
      />
    </div>
  );
};

export default MedicinesPage;
