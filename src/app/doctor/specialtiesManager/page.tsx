"use client"

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { MoreVertical, Plus, Search } from "lucide-react";
import { AddSpecialtyModal } from "../AddSpecialtyModal";
import React from "react";

// Sample data - replace with actual data from your backend
const initialSpecialties  = [
  { id: 1, name: "Da liễu", count: 12 },
  { id: 2, name: "Tim mạch", count: 12 },
  { id: 3, name: "Nội", count: 12 },
  { id: 4, name: "Ngoại", count: 12 },
  { id: 5, name: "Da liễu", count: 12 },
  { id: 6, name: "Da liễu", count: 12 },
  { id: 7, name: "Da liễu", count: 12 },
];

const SpecialtiesPage = () => {

  const [specialties, setSpecialties] = React.useState(initialSpecialties);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleAddSpecialty = (data: { name: string; count: number }) => {
    setSpecialties((prev) => [
      ...prev,
      { id: prev.length + 1, name: data.name, count: data.count },
    ]);
  };

  return (
    <div className="flex flex-col">
      {/* Header Section */}
      <div className="border-b bg-white">
        <div className="flex h-16 items-center justify-between px-4">
          <h1 className="text-lg font-semibold">Danh sách chuyên khoa</h1>
          <Button size="sm" variant="system" onClick={() => setIsModalOpen(true)}>
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
                <TableHead className="w-[80px]">STT</TableHead>
                <TableHead className="w-[10px]">Chuyên khoa</TableHead>
                <TableHead className="w-[450px] text-center">
                  Số lượng bác sĩ
                </TableHead>
                <TableHead className="w-[100px] text-center">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {specialties.map((specialty, index) => (
                <TableRow key={specialty.id}>
                  <TableCell className="font-medium">
                    {index + 1}
                  </TableCell>
                  <TableCell>{specialty.name}</TableCell>
                  <TableCell className="text-center">
                    {specialty.count}
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="h-8 w-8 p-0"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            Chỉnh sửa
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Xóa
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      {/* Modal for Adding Specialty */}
      <AddSpecialtyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddSpecialty}
      />
    </div>
  );
}

export default SpecialtiesPage;