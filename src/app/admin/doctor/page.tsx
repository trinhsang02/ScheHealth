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
  deleteDoctor,
} from "../../../services/api/adminServices";
import { fetchSpecialities } from "../../../services/api/specialtyService";
import { Doctor, DoctorCreateForm } from "../../../services/api/models";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface NewDoctorFormData {
  name: string;
  email: string;
  speciality: string;
  password: string;
}

interface Speciality {
  id: number;
  name: string;
}

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<NewDoctorFormData>({
    name: "",
    email: "",
    speciality: "Chọn chuyên khoa",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [specialities, setSpecialities] = useState<Speciality[]>([]);

  useEffect(() => {
    loadDoctors();
    loadSpecialities();
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

  const loadSpecialities = async () => {
    try {
      const response = await fetchSpecialities();
      console.log("specialities", response);
      setSpecialities(response);
    } catch (error) {
      alert("Không thể tải danh sách chuyên khoa");
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

  const getSpecialityNameById = (id: number) => {
    return specialities.find((s) => s.id === id)?.name || "Unknown";
  };

  const handleCreateDoctor = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const doctorData: DoctorCreateForm = {
        email: formData.email,
        password: formData.password,
        name: formData.name,
        role: "doctor",
        speciality_id: parseInt(formData.speciality),
      };
      console.log(doctorData);
      const response = await createDoctor(doctorData);
      console.log(response.data);
      if (response.data.success) {
        alert("Thêm bác sĩ thành công");
        setIsModalOpen(false);
        loadDoctors();
        setFormData({
          name: "",
          email: "",
          speciality: "Chọn chuyên khoa",
          password: "",
        });
      }
    } catch (error) {
      alert("Không thể thêm bác sĩ");
    }
  };

  const passwordsMatch = () => {
    return !confirmPassword || formData.password === confirmPassword;
  };

  return (
    <div className="flex flex-col">
      {/* Header Section */}
      <div className="border-b bg-white">
        <div className="flex h-16 items-center justify-between px-4">
          <h1 className="text-lg font-semibold">Danh sách bác sĩ</h1>
          <Button
            size="sm"
            variant="system"
            onClick={() => setIsModalOpen(true)}
          >
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
                  <TableCell>{doctor.speciality}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          /* Xử lý sửa */
                        }}
                      >
                        <Edit className="h-4 w-4" />
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
            <button key={index} className="p-2">
              {page}
            </button>
          ))}
          <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm">
            Sau
          </button>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Thêm bác sĩ mới</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateDoctor}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Tên
                </Label>
                <Input
                  id="name"
                  className="col-span-3"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  className="col-span-3"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right">
                  Mật khẩu
                </Label>
                <Input
                  id="password"
                  type="password"
                  className="col-span-3"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="confirmPassword" className="text-right">
                  Nhập lại mật khẩu
                </Label>
                <div className="col-span-3">
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  {!passwordsMatch() && (
                    <p className="text-sm text-red-500 mt-1">
                      Mật khẩu không khớp
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="speciality" className="text-right">
                  Chuyên khoa
                </Label>
                <div className="col-span-3">
                  <Select
                    value={formData.speciality}
                    onValueChange={(value) => {
                      setFormData({ ...formData, speciality: value });
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue>
                        {formData.speciality == "Chọn chuyên khoa"
                          ? "Chọn chuyên khoa"
                          : getSpecialityNameById(
                              parseInt(formData.speciality)
                            )}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {specialities.map((speciality) => (
                        <SelectItem
                          key={speciality.id}
                          value={speciality.id.toString()}
                        >
                          {speciality.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Lưu</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DoctorsPage;
