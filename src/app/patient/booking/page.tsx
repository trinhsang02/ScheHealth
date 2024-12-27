'use client'

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import axios from 'axios';

const AppointmentPage = () => {
  const router = useRouter();
  const isLoggedIn = true;

  const handleBooking = async () => {
    if (!isLoggedIn) {
      alert("Bạn cần đăng nhập để đặt lịch.");
      return;
    }

    try {
      const response = await axios.post('/api/booking', {
        /* dữ liệu đặt lịch */
      });

      // Xử lý dữ liệu trả về
      console.log(response.data);
    } catch (error) {
      console.error('Đặt lịch không thành công:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans">

      {/* Main Content */}
      <main className="flex flex-1 justify-center py-5">
        <div className="w-full max-w-lg p-4">
          <h1 className="text-2xl font-bold mb-2">Đặt lịch ngay</h1>
          <p className="text-sm text-gray-600 mb-4">Lựa chọn dịch vụ phù hợp</p>

          {/* Image Section */}
          <div className="bg-cover bg-center rounded-xl aspect-video mb-4" style={{ backgroundImage: 'url("https://cdn.usegalileo.ai/sdxl10/28c9faa9-8df8-4b95-a84f-3e61e1185f88.png")' }}>
            {/* You can add overlay or additional content here if needed */}
          </div>

          {/* Service Options */}
          <div className="flex flex-col gap-4">
            {/* Standard Service */}
            <div className="flex items-center justify-between bg-white rounded-xl shadow p-4">
              <div>
                <h2 className="text-lg font-bold">Tiêu chuẩn</h2>
                <p className="text-gray-500">30 phút • 100.000 VNĐ</p>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleBooking}>Đặt lịch</button>
            </div>

            {/* VIP Service */}
            {/* <div className="flex items-center justify-between bg-white rounded-xl shadow p-4">
              <div>
                <h2 className="text-lg font-bold">VIP</h2>
                <p className="text-gray-500">60 phút • 200.000 VNĐ</p>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded">Đặt lịch</button>
            </div> */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AppointmentPage;
