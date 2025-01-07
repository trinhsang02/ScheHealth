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
import { fetchAppointmentHistory } from "@/services/api/appointmentService";
import { AppointmentHistoryResponse } from "@/services/api/models";

interface BookingHistory {
  id: string;
  date: string;
  specialty: string;
  status: "completed" | "waiting";
}


const handlePayment = (bookingId: string) => {
  // Add logic
  console.log("Processing payment for booking:", bookingId);
};

const BookingHistory: React.FC = () => {
  const [records, setRecords] = useState<AppointmentHistoryResponse[]>([]);
  const [specialities, setSpecialities] = useState([]);

  useEffect(() => {
    const fetchSpecialities = async () => {
      try {
        console.log("fetching appointment history");
        const data = await fetchAppointmentHistory();
        setRecords(data);
        console.log("records", records);
      } catch (error) {
        console.error(error);
        throw error;
      }
    };
    fetchSpecialities();
  }, []);

  return (
    <div className="px-4 py-6">
      <h2 className="text-2xl font-semibold mb-6">Lịch sử đặt lịch</h2>
      <div className="rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-medium">Ngày khám</TableHead>
              <TableHead className="font-medium">Số thứ tự</TableHead>
              <TableHead className="font-medium">Giờ dự kiến</TableHead>
              <TableHead className="font-medium">Chuyên khoa</TableHead>
              <TableHead className="font-medium">
                Trạng thái thanh toán
              </TableHead>
              <TableHead className="font-medium text-center">
                Thao tác
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((record) => (
              <TableRow key={record.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">{record.date}</TableCell>
                <TableCell className="font-medium">
                  {record.numerical_order}
                </TableCell>
                <TableCell className="font-medium">
                  {record.appointment_time}
                </TableCell>
                <TableCell>{record.speciality_name}</TableCell>
                <TableCell>
                  <Badge
                    className={
                      record.status === "Paid"
                        ? "bg-green-50 text-green-700 border border-green-200 hover:bg-green-50"
                        : "bg-yellow-50 text-yellow-700 border border-yellow-200 hover:bg-yellow-50"
                    }
                  >
                    {record.status === "Paid" ? "Hoàn thành" : "Chờ thanh toán"}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <button
                    onClick={() => handlePayment(record.id.toString())}
                    disabled={record.status === "Paid"}
                    className={`inline-flex items-center justify-center rounded-md text-sm font-medium h-9 px-4 py-2 ${
                      record.status === "Paid"
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-blue-500 text-white hover:bg-blue-600 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    }`}
                  >
                    Thanh toán
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default BookingHistory;
