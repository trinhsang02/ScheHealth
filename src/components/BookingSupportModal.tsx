import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Phone } from 'lucide-react';

interface BookingSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingSupportModal: React.FC<BookingSupportModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Hướng dẫn đặt khám
          </DialogTitle>
          <DialogDescription className="space-y-4">
            <div className="bg-white p-6 rounded-lg">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Các bước đặt khám:</h3>
                  <ol className="list-decimal pl-5 space-y-2 text-gray-600">
                    <li>Chọn chuyên khoa bạn muốn đặt khám</li>
                    <li>Chọn ngày và giờ khám phù hợp</li>
                    <li>Điền thông tin cá nhân và lý do khám</li>
                    <li>Xác nhận và đợi phản hồi từ bệnh viện</li>
                  </ol>
                </div>
                
                <div className="border-t pt-4">
                  <h3 className="font-medium text-gray-900 mb-2">Hỗ trợ đặt khám:</h3>
                  <div className="flex items-center space-x-2 text-green-600">
                    <Phone size={20} />
                    <a href="tel:1900-1234" className="text-lg font-medium">
                      1900-1234
                    </a>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Thời gian hỗ trợ: 7:30 - 17:00 (Thứ 2 - Chủ nhật)
                  </p>
                </div>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default BookingSupportModal;