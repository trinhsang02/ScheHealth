'use client'
import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { format, isAfter } from "date-fns";
import { CalendarIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  const [specialityId, setSpecialityId] = useState<number | null>(null);
  const [numericalOrder, setNumericalOrder] = useState<number | null>(null);
  const [selectedSpeciality, setSelectedSpeciality] = useState('');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [patientName, setPatientName] = useState('');
  const [patientBirthday, setPatientBirthday] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientReason, setPatientReason] = useState('');
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const today = new Date();

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
    if (selectedDate) {
      if (!isAfter(selectedDate, today)) {
        alert(`Vui lòng chọn sau ngày ${today.toLocaleDateString()}.`);      
      } else {
        setDate(selectedDate); 
        setIsCalendarOpen(false); 
      }
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
      
      setAppointmentNumber(String(response.id));
      setNumericalOrder(response.numerical_order);
      setSpecialityId(response.speciality_id);
      setShowTicketModal(true);
      onOpenChange(false);
      
    } catch (error: any) {
      if (error.response?.data?.message) {
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
            <div className="relative w-full">
              <button
                id="dob"
                onClick={() => setIsCalendarOpen((prev) => !prev)} 
                className={`w-full p-3 rounded-lg bg-gray-100 border border-gray-300 text-left ${date ? "text-black" : "text-gray-400"
                  }`}
              >
                <CalendarIcon className="mr-2 h-4 w-4 inline" />
                <span className="text-sm"> 
                  {date ? format(date, "dd/MM/yyyy") : "Chọn ngày"}
                </span>
              </button>

              {isCalendarOpen && (
                <div
                  className="absolute bottom-full left-0 z-50 mt-2 bg-white border border-gray-300 rounded-lg shadow-md"
                  style={{ zIndex: 9999 }}
                >
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateSelect}
                    initialFocus
                  />
                </div>
              )}
            </div>
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
        numericalOrder={numericalOrder}
        specialityId={specialityId}
      />
    </>
  );
};

export default AppointmentFormModal;