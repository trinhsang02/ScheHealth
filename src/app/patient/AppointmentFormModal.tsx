"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { format, isAfter } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

import { fetchSpecialities } from "../../services/api/specialtyService";
import { specialityData } from "../../services/api/models";
import { createAppointment } from "../../services/api/appointmentService";
import AppointmentTicketModal from "./AppointmentTicketModal";
import { jwtDecode } from "jwt-decode";
import { RootState } from "@/store/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

interface AppointmentFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AppointmentFormModal = ({
  open,
  onOpenChange,
}: AppointmentFormModalProps) => {
  const router = useRouter();
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [appointmentNumber, setAppointmentNumber] = useState(0);
  const [specialities, setSpecialities] = useState([]);
  const [selectedSpeciality, setSelectedSpeciality] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [patientReason, setPatientReason] = useState("");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const today = new Date();
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const authState = useSelector((state: RootState) => state.auth);

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
    if (!authState.user || !date || !selectedSpeciality) {
      alert("Vui lòng điền đầy đủ thông tin");
      return;
    }
    console.log("accessToken", sessionStorage.getItem("accessToken"));
    
    try {
      const appointmentData = {
        patient_id: Number(authState.user.id),
        patient_name: authState.user.name,
        patient_birthday: authState.user.birthday,
        patient_phone: authState.user.phone,
        patient_reason: patientReason,
        speciality_id: Number(selectedSpeciality),
        date: format(date, "yyyy-MM-dd"),
      };

      const response = await createAppointment(appointmentData);
      console.log("response", response);

      if (response.success) {
        setAppointmentNumber(response.data.numerical_order);
        setAppointmentDate(format(date, "yyyy-MM-dd"));
        setAppointmentTime(response.data.appointment_time);
        setShowTicketModal(true);
        onOpenChange(false);
      } else {
        alert(`Không thể tạo lịch hẹn: ${response.message}`);
      }
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(`Lỗi: ${error.response.data.message}`);
      } else {
        alert(`Đã xảy ra lỗi không xác định: ${error.message}`);
      }
    }
  };

  const handleModalChange = (open: boolean) => {
    setShowTicketModal(open);
    if (!open) {
      router.push("/patient/homepage");
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold mb-6">
              Chọn lịch khám
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Họ và Tên</Label>
                <Input
                  type="text"
                  className="w-full bg-gray-100"
                  value={authState.user ? authState.user.name : ''}
                  disabled
                />
              </div>
              <div>
                <Label>Ngày sinh</Label>
                <Input
                  type="text"
                  className="w-full bg-gray-100"
                  value={authState.user ? authState.user.birthday : ''}
                  disabled
                />
              </div>
            </div>

            <div>
              <Label>Email</Label>
              <Input
                type="email"
                className="w-full p-3 rounded-lg bg-gray-100"
                value={authState.user ? authState.user.email : ''}
                disabled
              />
            </div>

            <div>
              <Label>Số điện thoại</Label>
              <Input
                type="tel"
                className="w-full p-3 rounded-lg bg-gray-100"
                value={authState.user ? authState.user.phone : ''}
                disabled
              />
            </div>

            <div>
              <Label>Lý do khám</Label>
              <Input
                type="text"
                className="w-full p-3 rounded-lg"
                placeholder="Nhập lý do khám của bạn"
                value={patientReason}
                onChange={(e) => setPatientReason(e.target.value)}
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
        appointmentDate={appointmentDate}
        appointmentTime={appointmentTime}
        appointmentNumber={appointmentNumber}

      />
    </>
  );
};

export default AppointmentFormModal;
