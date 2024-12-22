"use client";

import React, { useState } from 'react';
import { 
  Printer, 
  Search, 
  XCircle, 
  X 
} from 'lucide-react';

interface Test {
  id: string;
  code: string;
  name: string;
  group: string;
  price: number;
}

interface ClsModalProps {
  onClose: () => void;
  patientName: string;
  patientDob: string;
  patientGender: string;
  onSave?: (tests: Test[]) => void;
}

export default function ClsModal({ 
  onClose, 
  patientName, 
  patientDob, 
  patientGender,
  onSave
}: ClsModalProps) {
  const [selectedTests, setSelectedTests] = useState<Test[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPrintModal, setShowPrintModal] = useState(false);

  const allTests: Test[] = [
    { id: 'XN001', code: 'XN001', name: 'Điện giải đồ', group: 'Hóa sinh', price: 120000 },
    { id: 'XN002', code: 'XN002', name: 'Men gan', group: 'Hóa sinh', price: 150000 },
    { id: 'XN003', code: 'XN003', name: 'Đường huyết', group: 'Hóa sinh', price: 80000 },
    { id: 'SA001', code: 'SA001', name: 'Siêu âm tim', group: 'Chẩn đoán hình ảnh', price: 250000 }
  ];

  const filteredTests = allTests.filter(test => 
    test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    test.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTestSelect = (test: Test) => {
    if (!selectedTests.find(t => t.id === test.id)) {
      setSelectedTests([...selectedTests, test]);
    }
  };

  const removeSelectedTest = (testId: string) => {
    setSelectedTests(selectedTests.filter(test => test.id !== testId));
  };

  const handleSave = () => {
    onSave && onSave(selectedTests);
    onClose();
  };

  return (
    <>
      {/* Main CLS Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-white rounded-lg w-[90%] max-w-4xl max-h-[90vh] overflow-auto">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-semibold">Chỉ định cận lâm sàng</h2>
            <div className="flex gap-2">
              <button 
                onClick={() => setShowPrintModal(true)}
                className="btn bg-green-500 text-white flex items-center gap-2 px-4 py-2 rounded"
              >
                <Printer size={16} />
                In chỉ định
              </button>
              <button 
                onClick={onClose}
                className="btn bg-gray-200 text-gray-700 px-4 py-2 rounded"
              >
                Đóng
              </button>
            </div>
          </div>

          {/* Patient Info */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50">
            {[
              { label: 'Bệnh nhân', value: patientName },
              { label: 'Ngày sinh', value: patientDob },
              { label: 'Giới tính', value: patientGender }
            ].map((item, index) => (
              <div key={index} className="flex flex-col">
                <span className="text-xs text-gray-600">{item.label}</span>
                <span className="font-semibold">{item.value}</span>
              </div>
            ))}
          </div>

          {/* Search Box */}
          <div className="p-4 flex gap-2">
            <input 
              type="text" 
              placeholder="Tìm kiếm xét nghiệm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-3 py-2 border rounded"
            />
            <button className="btn bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2">
              <Search size={16} />
              Tìm kiếm
            </button>
          </div>

          {/* Selected Tests */}
          {selectedTests.length > 0 && (
            <div className="p-4 bg-gray-50 flex flex-wrap gap-2">
              {selectedTests.map(test => (
                <div 
                  key={test.id} 
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center gap-2"
                >
                  {test.name}
                  <button onClick={() => removeSelectedTest(test.id)}>
                    <XCircle size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Tests Table */}
          <div className="p-4">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-left">
                    <input type="checkbox" />
                  </th>
                  <th className="p-2 text-left">Mã XN</th>
                  <th className="p-2 text-left">Tên xét nghiệm</th>
                  <th className="p-2 text-left">Nhóm XN</th>
                  <th className="p-2 text-right">Đơn giá</th>
                  <th className="p-2 text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredTests.map(test => (
                  <tr key={test.id} className="border-b hover:bg-gray-50">
                    <td className="p-2">
                      <input type="checkbox" />
                    </td>
                    <td className="p-2">{test.code}</td>
                    <td className="p-2">{test.name}</td>
                    <td className="p-2">{test.group}</td>
                    <td className="p-2 text-right">
                      {test.price.toLocaleString()} đ
                    </td>
                    <td className="p-2 text-center">
                      <button 
                        onClick={() => handleTestSelect(test)}
                        className="text-blue-500 hover:bg-blue-100 px-2 py-1 rounded"
                      >
                        Chọn
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer Buttons */}
          <div className="p-4 flex justify-end gap-2 border-t">
            <button 
              onClick={onClose}
              className="btn bg-gray-200 text-gray-700 px-4 py-2 rounded"
            >
              Hủy
            </button>
            <button 
              onClick={handleSave}
              className="btn bg-blue-500 text-white px-4 py-2 rounded"
            >
              Lưu chỉ định
            </button>
          </div>
        </div>
      </div>

      {/* Print Preview Modal */}
      {showPrintModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg w-[90%] max-w-4xl max-h-[90vh] overflow-auto p-6 relative">
            <button 
              onClick={() => setShowPrintModal(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
            >
              <X size={24} />
            </button>

            <div className="text-center mb-6">
              <h3 className="text-xl font-bold">BỆNH VIỆN ABC</h3>
              <h3 className="text-lg font-semibold">PHIẾU CHỈ ĐỊNH CẬN LÂM SÀNG</h3>
              <p className="text-sm text-gray-600">Số phiếu: CLS-2024-001</p>
            </div>

            <div className="bg-gray-50 p-4 rounded mb-6">
              <div className="grid grid-cols-2 gap-4">
                <p><strong>Họ tên:</strong> {patientName}</p>
                <p><strong>Ngày sinh:</strong> {patientDob}</p>
                <p><strong>Giới tính:</strong> {patientGender}</p>
                <p><strong>Địa chỉ:</strong> Hà Nội</p>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Danh sách chỉ định:</h4>
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 text-left">STT</th>
                    <th className="p-2 text-left">Mã XN</th>
                    <th className="p-2 text-left">Tên xét nghiệm</th>
                    <th className="p-2 text-left">Nhóm XN</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedTests.map((test, index) => (
                    <tr key={test.id} className="border-b">
                      <td className="p-2">{index + 1}</td>
                      <td className="p-2">{test.code}</td>
                      <td className="p-2">{test.name}</td>
                      <td className="p-2">{test.group}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-right mt-8">
              <p>Ngày ... tháng ... năm 2024</p>
              <p className="mt-4">Bác sĩ chỉ định</p>
              <p className="mt-16">(Ký và ghi rõ họ tên)</p>
            </div>

            <div className="mt-6 text-center">
              <button 
                onClick={() => window.print()}
                className="btn bg-blue-500 text-white px-6 py-2 rounded flex items-center gap-2 mx-auto"
              >
                <Printer size={16} />
                In phiếu
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}