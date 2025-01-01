'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import hospitalImage from '../../../assets/hospital-image.png';
import ServiceSelectionModal from '../ServiceSelectionModal';
import AppointmentFormModal from '../AppointmentFormModal';

export default function MainViewPatient() {
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);

  const handleBookingClick = () => {
    setShowServiceModal(true);
  };

  const handleServiceSelect = () => {
    setShowServiceModal(false);
    setShowAppointmentModal(true);
  };

  return (
    <div>
      <main className="flex-1 px-4 py-6">
        <div className="mb-8 h-[300px] w-full overflow-hidden rounded-lg">
          <Image 
            src={hospitalImage}
            alt="Hospital Building"
            width={1200}
            height={300}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex justify-center gap-4">
          <QuickActionButton text="Hỗ trợ đặt khám" />
          <QuickActionButton text="Lịch sử thanh toán" />
          <QuickActionButton text="Tra cứu hóa đơn" />
          <QuickActionButton text="Tra cứu kết quả khám bệnh" />
        </div>

        <div className="mt-6 flex justify-center">
          <button 
            className="rounded-lg bg-[#00B074] px-16 py-3 text-white"
            onClick={handleBookingClick}
          >
            Đặt khám
          </button>
        </div>
      </main>

      <footer className="mt-auto py-4 text-center text-sm text-gray-500">
        © 2024 ScheHealth
      </footer>

      <ServiceSelectionModal
        open={showServiceModal}
        onOpenChange={setShowServiceModal}
        onServiceSelect={handleServiceSelect}
      />

      <AppointmentFormModal
        open={showAppointmentModal}
        onOpenChange={setShowAppointmentModal}
      />
    </div>
  );
}

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