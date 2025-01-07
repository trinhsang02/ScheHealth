'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { appointmentData } from '../../../services/api/models';
import { fetchAppointmentBySpecialityID, updateAppointmentStatus } from '../../../services/api/appointmentService';
import authService from '../../../services/api/authService';

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<appointmentData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const itemsPerPage = 10;
  const router = useRouter();

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const userData = authService.getUserData();
      if (!userData?.speciality_id) {
        throw new Error('Không tìm thấy thông tin chuyên khoa');
      }

      const response = await fetchAppointmentBySpecialityID(userData.speciality_id);
      if (response.success) {
        setAppointments(response.data);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi');
    } finally {
      setLoading(false);
    }
  };

  const handleStartTreatment = async (appointment: appointmentData) => {
    try {
      // Update status to "in progress"
      const response = await updateAppointmentStatus(appointment.id!, 'in progress');
      
      if (response.success) {
        // Refresh appointments list
        await fetchAppointments();
        
        // Navigate to treatment page
        router.push(`/doctor/treatment?patientId=${appointment.patient_id}`);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không thể bắt đầu khám');
    }
  };

  const getStatusClass = (status: string) => {
    const baseClass = "px-3 py-1.5 rounded-full text-sm font-medium inline-block";
    switch (status.toLowerCase()) {
      case 'scheduled':
        return `${baseClass} bg-amber-50 text-amber-600`;
      case 'in progress':
        return `${baseClass} bg-blue-50 text-blue-600`;
      case 'completed':
        return `${baseClass} bg-green-50 text-green-600`;
      case 'cancelled':
        return `${baseClass} bg-red-50 text-red-600`;
      default:
        return baseClass;
    }
  };

  const getStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case 'scheduled':
        return 'Chờ khám';
      case 'in progress':
        return 'Đang khám';
      case 'completed':
        return 'Đã khám';
      case 'cancelled':
        return 'Hủy khám';
      default:
        return status;
    }
  };

  // Calculate pagination
  const totalPages = Math.ceil(appointments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAppointments = appointments.slice(startIndex, endIndex);

  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-gray-600">Đang tải...</div>
    </div>;
  }

  if (error) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-red-600">Lỗi: {error}</div>
    </div>;
  }

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
                  <th className="px-4 py-3 text-left text-gray-600">Ngày sinh</th>
                  <th className="px-4 py-3 text-left text-gray-600">Thời gian khám</th>
                  <th className="px-4 py-3 text-left text-gray-600">Lý do khám</th>
                  <th className="px-4 py-3 text-left text-gray-600">Trạng thái</th>
                  <th className="px-4 py-3 text-left text-gray-600">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {currentAppointments.map((appointment, index) => (
                  <tr key={appointment.id} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3">{startIndex + index + 1}</td>
                    <td className="px-4 py-3">{appointment.patient_name}</td>
                    <td className="px-4 py-3">{appointment.patient_phone}</td>
                    <td className="px-4 py-3">{appointment.patient_birthday}</td>
                    <td className="px-4 py-3">{appointment.date}</td>
                    <td className="px-4 py-3">{appointment.patient_reason}</td>
                    <td className="px-4 py-3">
                      <span className={getStatusClass(appointment.status || 'scheduled')}>
                        {getStatusText(appointment.status || 'scheduled')}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium ${
                            appointment.status?.toLowerCase() === 'scheduled'
                              ? 'bg-blue-500 text-white hover:bg-blue-600'
                              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          }`}
                          disabled={appointment.status?.toLowerCase() !== 'scheduled'}
                          onClick={() => handleStartTreatment(appointment)}
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 8L22 12L18 16"/>
                            <path d="M2 12H22"/>
                          </svg>
                          Gọi khám
                        </button>
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
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
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
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
              <button 
                className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
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