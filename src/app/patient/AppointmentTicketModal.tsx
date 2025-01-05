import React, { useEffect, useState } from 'react';
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSpecialtyById } from '../../services/api/specialtyService';

interface AppointmentTicketModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appointmentNumber: string;
  specialityName?: string;
  numericalOrder?: number | null;
  specialityId?: number | null;
}

const AppointmentTicketModal = ({
  open,
  onOpenChange,
  appointmentNumber,
  specialityName: propSpecialityName,
  specialityId, 
}: AppointmentTicketModalProps) => {
  const [specialtyName, setSpecialtyName] = useState<string | undefined>(propSpecialityName);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSpecialtyName = async () => {
      if (specialityId && !propSpecialityName) {
        try {
          const specialty = await getSpecialtyById(specialityId);
          setSpecialtyName(specialty.name);
        } catch (error) {
          console.error('Không thể lấy tên chuyên khoa:', error);
          setError('Không thể tải tên chuyên khoa');
        }
      }
    };

    fetchSpecialtyName();
  }, [specialityId, propSpecialityName]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            ScheHealth
          </DialogTitle>
        </DialogHeader>
        
        {error && (
          <div className="text-red-500 text-center">
            {error}
          </div>
        )}

        <Card className="border-2">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-lg font-semibold">
              {specialtyName || 'KHOA KHÁM BỆNH'}  {/* Sửa từ specialityName sang specialtyName */}
            </CardTitle>
            <div className="text-base font-medium">Khám Dịch Vụ</div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center space-y-2">
              <div className="text-xl font-bold">
                Số thứ tự: {appointmentNumber}
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>Ngày: {format(new Date(), "dd-MM-yyyy")}</div>
                <div>Giờ: {format(new Date(), "HH:mm:ss")}</div>
              </div>
            </div>
            <div className="text-center text-sm font-medium text-blue-600">
              Số khám bệnh cho ngày mai!
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentTicketModal;
