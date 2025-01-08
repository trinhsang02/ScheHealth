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
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { 
  fetchAllDoctors, 
  createDoctor, 
  updateDoctor, 
  deleteDoctor 
} from "../../../services/api/adminServices";

import { Doctor } from "../../../services/api/models";

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      const response = await fetchAllDoctors({ search: searchTerm });
      if (response.success) {
        setDoctors(response.data);
      }
    } catch (error) {
      alert("Không thể tải danh sách bác sĩ");
    }
  };

  const handleDelete = async (doctor: Doctor) => {
    if (confirm(`Bạn có chắc chắn muốn xóa bác sĩ ${doctor.name}?`)) {
      try {
        const response = await deleteDoctor(doctor.id);
        if (response.success) {
          alert("Xóa bác sĩ thành công");
          loadDoctors();
        }
      } catch (error) {
        alert("Không thể xóa bác sĩ");
      }
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    // Thêm debounce nếu cần
    setTimeout(() => {
      loadDoctors();
    }, 500);
  };

  return (
    <div className="flex flex-col">
      {/* Header Section */}
      <div className="border-b bg-white">
        <div className="flex h-16 items-center justify-between px-4">
          <h1 className="text-lg font-semibold">Danh sách bác sĩ</h1>
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
            <Input 
              placeholder="Tìm kiếm..." 
              className="pl-8" 
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>

        {/* Table */}
        <div className="rounded-md border bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã BS</TableHead>
                <TableHead>Tên bác sĩ</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Số điện thoại</TableHead>
                <TableHead>Chuyên khoa</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {doctors.map((doctor) => (
                <TableRow key={doctor.id}>
                  <TableCell className="font-medium">{doctor.id}</TableCell>
                  <TableCell>{doctor.name}</TableCell>
                  <TableCell>{doctor.email}</TableCell>
                  <TableCell>{doctor.phone}</TableCell>
                  <TableCell>{doctor.speciality}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {/* Xử lý sửa */}}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(doctor)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center px-4">
        <span>Tổng số: {doctors.length} bác sĩ</span>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm">
            Trước
          </button>
          {[1, 2, 3, "...", 10].map((page, index) => (
            <button 
              key={index} 
              className="p-2"
            >
              {page}
            </button>
          ))}
          <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm">
            Sau
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorsPage;