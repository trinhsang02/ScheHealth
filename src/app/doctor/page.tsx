'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'

interface Appointment {
  id: number;
  patientName: string;
  phone: string;
  gender: string;
  birthDate: string;
  appointmentTime: string;
  status: 'waiting' | 'in-progress' | 'completed' | 'cancelled';
}

const appointments: Appointment[] = [
  {
    id: 1,
    patientName: "Nguyễn Văn Hùng",
    phone: "0987568742",
    gender: "Nam",
    birthDate: "06/07/1977",
    appointmentTime: "17/07/2023 - 22:09",
    status: "waiting"
  },
  {
    id: 2,
    patientName: "Vũ Văn Hưng",
    phone: "0475836574",
    gender: "Nam",
    birthDate: "15/07/2000",
    appointmentTime: "16/07/2023 - 16:43",
    status: "in-progress"
  },
  {
    id: 3,
    patientName: "Nguyễn Huy Hoàng",
    phone: "0838978446",
    gender: "Nam",
    birthDate: "04/10/2001",
    appointmentTime: "20/07/2023 - 21:09",
    status: "completed"
  },
  {
    id: 4,
    patientName: "Trần Thị Mai",
    phone: "0912345678",
    gender: "Nữ",
    birthDate: "12/03/1990",
    appointmentTime: "17/07/2023 - 09:30",
    status: "waiting"
  },
  {
    id: 5,
    patientName: "Lê Văn Đức",
    phone: "0898765432",
    gender: "Nam",
    birthDate: "25/11/1985",
    appointmentTime: "17/07/2023 - 10:15",
    status: "completed"
  },
  {
    id: 6,
    patientName: "Phạm Thị Hương",
    phone: "0976543210",
    gender: "Nữ",
    birthDate: "08/09/1995",
    appointmentTime: "17/07/2023 - 11:00",
    status: "waiting"
  },
  {
    id: 7,
    patientName: "Hoàng Văn Nam",
    phone: "0865432109",
    gender: "Nam",
    birthDate: "30/12/1982",
    appointmentTime: "17/07/2023 - 13:45",
    status: "in-progress"
  },
  {
    id: 8,
    patientName: "Nguyễn Thị Lan",
    phone: "0954321098",
    gender: "Nữ",
    birthDate: "15/04/1988",
    appointmentTime: "17/07/2023 - 14:30",
    status: "cancelled"
  },
  {
    id: 9,
    patientName: "Trần Văn Hải",
    phone: "0843210987",
    gender: "Nam",
    birthDate: "22/06/1993",
    appointmentTime: "17/07/2023 - 15:15",
    status: "waiting"
  },
  {
    id: 10,
    patientName: "Lê Thị Thu",
    phone: "0932109876",
    gender: "Nữ",
    birthDate: "11/08/1987",
    appointmentTime: "17/07/2023 - 16:00",
    status: "completed"
  }
];

export default function AppointmentsPage() {
  const [currentPage] = useState(1);
  const itemsPerPage = 10;
  const router = useRouter();
  
  const getStatusClass = (status: Appointment['status']) => {
    const baseClass = "px-3 py-1.5 rounded-full text-sm font-medium inline-block";
    switch (status) {
      case 'waiting':
        return `${baseClass} bg-amber-50 text-amber-600`;
      case 'in-progress':
        return `${baseClass} bg-blue-50 text-blue-600`;
      case 'completed':
        return `${baseClass} bg-green-50 text-green-600`;
      case 'cancelled':
        return `${baseClass} bg-red-50 text-red-600`;
      default:
        return baseClass;
    }
  };

  const getStatusText = (status: Appointment['status']) => {
    switch (status) {
      case 'waiting':
        return 'Chờ khám';
      case 'in-progress':
        return 'Đang khám';
      case 'completed':
        return 'Đã khám';
      case 'cancelled':
        return 'Hủy khám';
    }
  };

  // Calculate pagination
  const totalPages = Math.ceil(appointments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAppointments = appointments.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="p-6">
        <div className="mb-6 flex items-center gap-2 text-gray-600">
          <span>Trang chủ</span>
          <span>/</span>
          <span>Danh sách khám bệnh</span>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-gray-600">STT</th>
                  <th className="px-4 py-3 text-left text-gray-600">Bệnh nhân</th>
                  <th className="px-4 py-3 text-left text-gray-600">Số điện thoại</th>
                  <th className="px-4 py-3 text-left text-gray-600">Giới tính</th>
                  <th className="px-4 py-3 text-left text-gray-600">Ngày sinh</th>
                  <th className="px-4 py-3 text-left text-gray-600">Thời gian khám</th>
                  <th className="px-4 py-3 text-left text-gray-600">Trạng thái</th>
                  <th className="px-4 py-3 text-left text-gray-600">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {currentAppointments.map((appointment) => (
                  <tr key={appointment.id} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3">{appointment.id}</td>
                    <td className="px-4 py-3">{appointment.patientName}</td>
                    <td className="px-4 py-3">{appointment.phone}</td>
                    <td className="px-4 py-3">{appointment.gender}</td>
                    <td className="px-4 py-3">{appointment.birthDate}</td>
                    <td className="px-4 py-3">{appointment.appointmentTime}</td>
                    <td className="px-4 py-3">
                      <span className={getStatusClass(appointment.status)}>
                        {getStatusText(appointment.status)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium ${
                                appointment.status === 'waiting'
                                ? 'bg-blue-500 text-white hover:bg-blue-600'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                            disabled={appointment.status !== 'waiting'}
                            onClick={() => {
                                try {
                                router.push(`/doctor/treatment?patientId=${appointment.id}`);
                                } catch (error) {
                                console.error('Navigation error:', error);
                                // Có thể thêm thông báo lỗi cho người dùng ở đây
                                }
                            }}
                            >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 8L22 12L18 16"/>
                                <path d="M2 12H22"/>
                            </svg>
                            Gọi khám
                        </button>
                        <select 
                          className="px-3 py-1.5 rounded-lg text-sm border border-gray-200 bg-white"
                          defaultValue={appointment.status}
                        >
                          <option value="waiting">Chờ khám</option>
                          <option value="in-progress">Đang khám</option>
                          <option value="completed">Đã khám</option>
                          <option value="cancelled">Hủy khám</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Hiển thị {startIndex + 1}-{Math.min(endIndex, appointments.length)} của {appointments.length} kết quả
            </div>
            <div className="flex gap-2">
              <button 
                className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm"
                disabled={currentPage === 1}
              >
                Trước
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  className={`px-3 py-1.5 border rounded-lg text-sm ${
                    currentPage === index + 1
                      ? 'border-blue-500 bg-blue-500 text-white'
                      : 'border-gray-200'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <button 
                className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm"
                disabled={currentPage === totalPages}
              >
                Sau
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}