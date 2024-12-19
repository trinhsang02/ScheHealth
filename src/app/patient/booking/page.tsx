'use client'

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'

const AppointmentPage = () => {
    const router = useRouter();
  
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-gray-300 px-10 py-3">
        <div className="flex items-center gap-4 text-[#0e141b]">
          <h2 className="text-lg font-bold">ScheHealth</h2>
        </div>
        <nav className="flex gap-8">
          <Link href="/" className="text-sm">Trang chủ</Link>
          <Link href="/patient/schedule" className="text-sm">Lịch khám</Link>
          <Link href="/patient/profile" className="text-sm">Hồ sơ</Link>
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Đăng nhập</button>
        </nav>
      </header>

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
              <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => router.push('/patient/appointment')}>Đặt lịch</button>
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
