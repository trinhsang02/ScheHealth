// pages/medical-history.tsx
"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  fetchAppointmentOfPatient,
  fetchAppointmentBySpecialityID,
  fetchAppointmentHistory,
  fetchMedicalRecord,
} from "../../../services/api/appointmentService";
import {
  AppointmentHistoryResponse,
  MedicalRecord,
} from "@/services/api/models";

const getStatusStyle = (status: number) => {
  switch (status) {
    case 1:
      return "bg-green-100 text-green-800 hover:bg-green-100";
    case 0:
      return "bg-orange-100 text-orange-800 hover:bg-orange-100";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100";
  }
};

const MedicalHistory: React.FC = () => {
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [specialities, setSpecialities] = useState([]);

  useEffect(() => {
    const fetchSpecialities = async () => {
      try {
        const data = await fetchMedicalRecord();
        setRecords(data);
        console.log("medical record", records);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSpecialities();
  }, []);

  return (
    <div className="px-4 py-6">
      <h2 className="text-2xl font-semibold mb-6">Lịch sử khám chữa bệnh</h2>
      <div className="rounded-md border p-2 mb-4">
        <Table>
          <TableHeader className="bg-gray-100 border-b">
            <TableRow>
              <TableHead>Ngày khám</TableHead>
              <TableHead>Bác sĩ</TableHead>
              <TableHead>Chẩn đoán</TableHead>
              <TableHead>Trạng thái</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((record) => (
              <TableRow key={record.date}>
                <TableCell>{record.date}</TableCell>
                <TableCell>{record.doctor_name}</TableCell>
                <TableCell>{record.diagnosis}</TableCell>
                <TableCell>
                  <Badge className={getStatusStyle(record.payment_status)}>
                    {record.payment_status === 0
                      ? "Chưa thanh toán"
                      : "Đã thanh toán"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MedicalHistory;
