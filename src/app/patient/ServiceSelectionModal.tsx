'use client'
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface ServiceSelectionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onServiceSelect: () => void;
}

const ServiceSelectionModal = ({ open, onOpenChange, onServiceSelect }: ServiceSelectionModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Đặt lịch ngay</DialogTitle>
          <p className="text-sm text-gray-600">Lựa chọn dịch vụ phù hợp</p>
        </DialogHeader>

        <div className="mt-4">
          {/* Image Section */}
          <div className="bg-cover bg-center rounded-xl aspect-video mb-4" style={{ backgroundImage: 'url("https://cdn.usegalileo.ai/sdxl10/28c9faa9-8df8-4b95-a84f-3e61e1185f88.png")' }}/>

          {/* Service Options */}
          <div className="flex flex-col gap-4">
            {/* Standard Service */}
            <div className="flex items-center justify-between bg-white rounded-xl shadow p-4">
              <div>
                <h2 className="text-lg font-bold">Tiêu chuẩn</h2>
                <p className="text-gray-500">30 phút • 100.000 VNĐ</p>
              </div>
              <Button 
                variant="default"
                onClick={onServiceSelect}
              >
                Đặt lịch
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceSelectionModal;