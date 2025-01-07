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

interface BookingHistory {
    id: string;
    date: string;
    specialty: string;
    status: "completed" | "waiting";
}

const bookings: BookingHistory[] = [
    {
        id: "1",
        date: "20/11/2024",
        specialty: "Nội tổng quát",
        status: "completed",
    },
    {
        id: "1",
        date: "15/11/2024",
        specialty: "Tim mạch",
        status: "completed",
    },
    {
        id: "1",
        date: "05/11/2024",
        specialty: "Da liễu",
        status: "completed",
    },
    {
        id: "1",
        date: "28/10/2024",
        specialty: "Răng hàm mặt",
        status: "completed",
    },
    {
        id: "1",
        date: "04/01/2025",
        specialty: "Tim mạch",
        status: "waiting",
    },
];

const handlePayment = (bookingId: string) => {
    // Add logic
    console.log('Processing payment for booking:', bookingId);
};

const BookingHistory: React.FC = () => {

    return (
        <div className="px-4 py-6">
            <h2 className="text-2xl font-semibold mb-6">Lịch sử đặt lịch</h2>
            <div className="rounded-lg border shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50">
                            <TableHead className="font-medium">Ngày khám</TableHead>
                            <TableHead className="font-medium">Chuyên khoa</TableHead>
                            <TableHead className="font-medium">Trạng thái thanh toán</TableHead>
                            <TableHead className="font-medium text-center">Thao tác</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {bookings.map((booking) => (
                            <TableRow key={booking.id} className="hover:bg-gray-50">
                                <TableCell className="font-medium">{booking.date}</TableCell>
                                <TableCell>{booking.specialty}</TableCell>
                                <TableCell>
                                    <Badge
                                        className={
                                            booking.status === "completed"
                                                ? "bg-green-50 text-green-700 border border-green-200 hover:bg-green-50"
                                                : "bg-yellow-50 text-yellow-700 border border-yellow-200 hover:bg-yellow-50"
                                        }
                                    >
                                        {booking.status === "completed" ? "Hoàn thành" : "Chờ thanh toán"}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-center">
                                    <button
                                        onClick={() => handlePayment(booking.id)}
                                        disabled={booking.status === "completed"}
                                        className={`inline-flex items-center justify-center rounded-md text-sm font-medium h-9 px-4 py-2 ${booking.status === "completed"
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
