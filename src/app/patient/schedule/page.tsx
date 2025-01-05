// pages/medical-history.tsx
'use client'

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { fetchAppointmentOfPatient, fetchAppointmentBySpecialityID } from '../../../services/api/appointmentService';



interface MedicalRecord {
  date: string
  specialty: string
  doctor: string
  diagnosis: string
  status: "completed" | "waiting"
}


const records: MedicalRecord[] = [
  {
    date: "20/11/2024",
    specialty: "Nội tổng quát",
    doctor: "BS. Nguyễn Văn B",
    diagnosis: "Viêm họng cấp",
    status: "completed",
  },
  {
    date: "15/11/2024",
    specialty: "Tim mạch",
    doctor: "BS. Trần Thị C",
    diagnosis: "Khám định kỳ",
    status: "completed",
  },
  {
    date: "05/11/2024",
    specialty: "Da liễu",
    doctor: "BS. Lê Thị D",
    diagnosis: "Dị ứng da",
    status: "completed",
  },
  {
    date: "28/10/2024",
    specialty: "Răng hàm mặt",
    doctor: "BS. Phạm Văn E",
    diagnosis: "Nhổ răng khôn",
    status: "completed",
  },
  {
    date: "04/01/2025",
    specialty: "Tim mạch",
    doctor: "",
    diagnosis: "",
    status: "waiting",
  },
]


const MedicalHistory: React.FC = () => {

  // const [records, setRecords] = useState<MedicalRecord[]>([]);
  // const [specialities, setSpecialities] = useState([]);

  // useEffect(() => {
  //   const fetchSpecialities = async () => {
  //     try {
  //       const data = await fetchAppointmentOfPatient();
  //       setSpecialities(data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchSpecialities();
  // }, []);

  return (
    <div className="px-4 py-6">
      <h2 className="text-2xl font-semibold mb-6">Lịch Sử Khám Chữa Bệnh</h2>
      <div className="rounded-md border p-2 mb-4">
        <Table>
          <TableHeader className='bg-gray-100 border-b'>
            <TableRow>
              <TableHead>Ngày khám</TableHead>
              <TableHead>Chuyên khoa</TableHead>
              <TableHead>Bác sĩ</TableHead>
              <TableHead>Chẩn đoán</TableHead>
              <TableHead>Trạng thái</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((record) => (
              <TableRow key={record.date + record.diagnosis}>
                <TableCell>{record.date}</TableCell>
                <TableCell>{record.specialty}</TableCell>
                <TableCell>{record.doctor}</TableCell>
                <TableCell>{record.diagnosis}</TableCell>
                <TableCell>
                  <Badge
                    className={
                      record.status === "completed"
                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                        : "bg-orange-100 text-orange-800 hover:bg-orange-100"
                    }
                  >
                    {record.status === "completed" ? "Hoàn thành" : "Chờ khám"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default MedicalHistory;
