import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AppointmentTicketModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appointmentDate: string;
  appointmentTime: string;
  appointmentNumber: number;
}

const AppointmentTicketModal = ({
  open,
  onOpenChange,
  appointmentNumber,
  appointmentDate,
  appointmentTime,
}: AppointmentTicketModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold mb-4">
            Schehealth
          </DialogTitle>
          <DialogTitle className="text-center text-lg font-bold">
            KHOA KHÁM BỆNH
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 text-center">
          <p className="font-medium">Khám Dịch Vụ</p>
          <div className="text-2xl font-bold">
            Số thứ tự: {appointmentNumber}
          </div>
          <div className="text-sm">
            Ngày: {appointmentDate}
            <br />
            Giờ: {appointmentTime}
          </div>
          <p className="text-sm italic">
            Lưu ý: Bạn cần đến sớm 30 phút trước giờ khám để được hỗ trợ tốt
            hơn.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentTicketModal;
