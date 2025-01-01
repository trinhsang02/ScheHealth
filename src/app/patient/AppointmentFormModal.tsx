'use client'
import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { Portal } from '@radix-ui/react-portal';
import { cn } from "@/lib/utils";
import { CalendarIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useRouter } from 'next/navigation';

import { fetchSpecialities } from '../../services/api/specialtyService';
import { specialityData } from '../../services/api/models';
import { createAppointment } from '../../services/api/appointmentService';
import AppointmentTicketModal from './AppointmentTicketModal';
import { jwtDecode } from "jwt-decode";

interface AppointmentFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AppointmentFormModal = ({ open, onOpenChange }: AppointmentFormModalProps) => {
  const router = useRouter();
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [appointmentNumber, setAppointmentNumber] = useState('');
  const [specialities, setSpecialities] = useState([]);
  const [selectedSpeciality, setSelectedSpeciality] = useState('');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [patientName, setPatientName] = useState('');
  const [patientBirthday, setPatientBirthday] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientReason, setPatientReason] = useState('');

  useEffect(() => {
    const getSpecialities = async () => {
      try {
        const data = await fetchSpecialities(); 
        setSpecialities(data);
      } catch (error) { 
        console.error(error);
      }
    };
    getSpecialities();
  }, []);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    const today = new Date();
    if (selectedDate && selectedDate > today) {
      setDate(selectedDate);
    } else {
      alert(`Vui lòng chọn sau ngày ${today.toLocaleDateString()}.`);
    }
  };

  const handleSubmit = async () => {
    const token = sessionStorage.getItem('accessToken');
    if (!token || !date || !selectedSpeciality) return;

    const decoded = jwtDecode(token) as {
      sub: string;
    };

    try {
      const appointmentData = {
        patient_id: Number(decoded.sub),
        patient_name: patientName,
        patient_birthday: patientBirthday,
        patient_phone: patientPhone,
        patient_reason: patientReason,
        speciality_id: Number(selectedSpeciality),
        date: format(date, 'yyyy-MM-dd'),
      };

      const response = await createAppointment(appointmentData);

      if (response.success) {
        setAppointmentNumber(response.appointmentNumber);
        setShowTicketModal(true);
        onOpenChange(false);
      } else {
        alert(`Không thể tạo lịch hẹn: ${response.message}`);
      }
    } catch (error: any) {
      // Handle error network or others
      if (error.response && error.response.data && error.response.data.message) {
        alert(`Lỗi: ${error.response.data.message}`);
      } else {
        alert(`Đã xảy ra lỗi không xác định: ${error.message}`);
      }
    }
  };

  const handleModalChange = (open: boolean) => {
    setShowTicketModal(open);
    if (!open) {
      router.push('/patient/homepage');
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold mb-6">Chọn lịch khám</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Họ và Tên</Label>
                <Input
                  type="text"
                  className="w-full"
                  placeholder="Nguyễn Văn A"
                  onChange={(e) => setPatientName(e.target.value)}
                />
              </div>
              <div>
                <Label>Ngày sinh</Label>
                <Input
                  type="text"
                  className="w-full"
                  placeholder="01/01/2000"
                  onChange={e => setPatientBirthday(e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label>Email</Label>
              <Input
                type="email"
                className="w-full p-3 rounded-lg bg-gray-100"
                placeholder="jane.doe@example.com"
              />
            </div>

            <div>
              <Label>Số điện thoại</Label>
              <Input
                type="tel"
                className="w-full p-3 rounded-lg bg-gray-100"
                placeholder="(+84) 456-7890"
                onChange={(e) => setPatientPhone(e.target.value)}
              />
            </div>

            <div>
              <Label>Chọn chuyên khoa</Label>
              <Select onValueChange={setSelectedSpeciality}>
                <SelectTrigger className="w-full p-3 rounded-lg bg-gray-100">
                  <SelectValue placeholder="Chọn chuyên khoa" />
                </SelectTrigger>
                <SelectContent>
                  {specialities.map((speciality: specialityData) => (
                    <SelectItem key={speciality.id} value={speciality.id}>
                      {speciality.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dob">Vui lòng chọn ngày phù hợp với bạn</Label>
            <Popover>
              <PopoverTrigger asChild className="w-full p-3 rounded-lg bg-gray-100">
                <Button
                  id="dob"
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "yyyy-MM-dd") : "Chọn ngày"}
                </Button>
              </PopoverTrigger>
              <Portal>
            <PopoverContent 
              className="w-auto p-0" 
              align="start"
              style={{ zIndex: 50 }}
            >
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                initialFocus
              />
            </PopoverContent>
          </Portal>
            </Popover>
            <Button
              className="w-full hover:blue-60"
              disabled={!date}
              variant="system"
              onClick={handleSubmit}
            >
              Đặt lịch ngay
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <AppointmentTicketModal
        open={showTicketModal}
        onOpenChange={handleModalChange}
        appointmentNumber={appointmentNumber}
      />
    </>
  );
};

export default AppointmentFormModal;