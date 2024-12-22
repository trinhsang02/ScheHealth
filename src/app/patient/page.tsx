'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import hospitalImage from '../../assets/hospital-image.png'

export default function MainViewPatient() {
  const router = useRouter();

  return (
    <div className="relative flex min-h-screen flex-col bg-[#F4FDF6]">
      {/* Header Section */}
      <header className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Thêm path cho logo nếu cần */}
            </svg>
            <h1 className="text-lg font-semibold">ScheHealth</h1>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex items-center gap-6">
          <Link href="/" className="text-sm">Trang chủ</Link>
          <Link href="/patient/schedule" className="text-sm">Lịch khám</Link>
          <Link href="/patient/profile" className="text-sm">Hồ sơ</Link>
          <Link href="/patient/login" className="text-sm">Đăng nhập</Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-6">
        {/* Hero Image */}
        <div className="mb-8 h-[300px] w-full overflow-hidden rounded-lg">
          <Image 
            src={hospitalImage}
            alt="Hospital Building"
            width={1200}
            height={300}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Quick Actions */}
        <div className="flex justify-center gap-4">
          <QuickActionButton text="Hỗ trợ đặt khám" />
          <QuickActionButton text="Lịch sử thanh toán" />
          <QuickActionButton text="Tra cứu hóa đơn" />
          <QuickActionButton text="Tra cứu kết quả khám bệnh" />
        </div>

        {/* Book Appointment Button */}
        <div className="mt-6 flex justify-center">
          <button className="rounded-lg bg-[#00B074] px-16 py-3 text-white" onClick={() => router.push('/patient/booking')}>
            Đặt khám
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-4 text-center text-sm text-gray-500">
        © 2024 ScheHealth
      </footer>
    </div>
  );
}

// Component for Quick Action Buttons
function QuickActionButton({ 
  text,
  active = false 
}: {
  text: string;
  active?: boolean;
}) {
  return (
    <button 
      className={`px-4 py-2 text-sm ${
        active 
          ? 'border-b-2 border-[#00B074] text-[#00B074]' 
          : 'text-gray-600'
      }`}
    >
      {text}
    </button>
  );
}

