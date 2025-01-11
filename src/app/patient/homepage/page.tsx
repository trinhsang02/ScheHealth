'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import hospitalImage from '../../../assets/hospital-image.png';
import ServiceSelectionModal from '../ServiceSelectionModal';
import AppointmentFormModal from '../AppointmentFormModal';
import { InvoiceModal } from '@/components/invoice/invoice-modal';
import { Button } from '@/components/ui/button';

export default function MainViewPatient() {
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  const handleBookingClick = () => {
    setShowServiceModal(true);
  };

  const handleServiceSelect = () => {
    setShowServiceModal(false);
    setShowAppointmentModal(true);
  };
  
  const handleInvoiceLookup = () => {
    setShowInvoiceModal(true);
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
          <Button variant="link" onClick={handleInvoiceLookup}>Tra cứu hóa đơn</Button>
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
      
      <InvoiceModal 
        open={showInvoiceModal} 
        onOpenChange={setShowInvoiceModal} 
      />
    </div>
  );
}

function QuickActionButton({ 
  text,
  active = false,
  onClick 
}: {
  text: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button 
      onClick={onClick}
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