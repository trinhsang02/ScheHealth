"use client";

import React, { useEffect, useState } from 'react';
import { Printer, Search, XCircle, X} from 'lucide-react';
import { fectchAllServices } from '../../services/api/service';
import { createContext, useContext } from 'react';
import { createInvoice } from '../../services/api/invoiceService';

interface Test {
  id: string;
  name: string;
  unit: string;
  price: number;
}

interface ClsModalProps {
  onClose: () => void;
  patientName: string;
  patientDob: string;
  patientGender: string;
  onSave?: (tests: Test[]) => void;
}

interface SelectedTestsContextType {
  selectedTests: Test[];
  addTest: (test: Test) => void;
  removeTest: (testId: string) => void;
  clearTests: () => void;
}

const SelectedTestsContext = createContext<SelectedTestsContextType | undefined>(undefined);

export function SelectedTestsProvider({ children }: { children: React.ReactNode }) {
  const [selectedTests, setSelectedTests] = useState<Test[]>([]);

  const addTest = (test: Test) => {
    setSelectedTests(prev => [...prev, test]);
  };

  const removeTest = (testId: string) => {
    setSelectedTests(prev => prev.filter(test => test.id !== testId));
  };

  const clearTests = () => {
    setSelectedTests([]);
  };

  return (
    <SelectedTestsContext.Provider value={{ selectedTests, addTest, removeTest, clearTests }}>
      {children}
    </SelectedTestsContext.Provider>
  );
}

export function useSelectedTests() {
  const context = useContext(SelectedTestsContext);
  if (context === undefined) {
    throw new Error('useSelectedTests must be used within a SelectedTestsProvider');
  }
  return context;
}

export default function ClsModal(props: ClsModalProps) {
  return (
    <SelectedTestsProvider>
      <ClsModalContent {...props} />
    </SelectedTestsProvider>
  );
}

function ClsModalContent({ onClose, patientName, patientDob, patientGender, onSave }: ClsModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [services, setServices] = useState<Test[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { selectedTests, addTest, removeTest } = useSelectedTests();

  const totalPrice = selectedTests.reduce((sum, test) => sum + (test.price || 0), 0);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true);
        const response = await fectchAllServices();
        if (response.success) {
          setServices(response.data);
        } else {
          console.error("Failed to fetch services:", response.message);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  const filteredTests = services.filter(test =>
    test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    String(test.id).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTestSelect = (test: Test) => {
    if (!selectedTests.find(t => t.id === test.id)) {
      addTest(test);
    }
  };

  const removeSelectedTest = (testId: string) => {
    removeTest(testId);
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
            <div className="p-4 bg-gray-50">
              <div className="flex flex-wrap gap-2 mb-2">
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
              <div className="text-right text-lg font-semibold">
                Tổng tiền: {totalPrice.toLocaleString()} đ
              </div>
            </div>
          )}

          {/* Tests Table */}
          <div className="p-4">
            {isLoading ? (
              <div className="text-center py-4">Đang tải dữ liệu...</div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 text-left">Mã XN</th>
                    <th className="p-2 text-left">Tên xét nghiệm</th>
                    <th className="p-2 text-right">Đơn giá</th>
                    <th className="p-2 text-center">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTests.map(test => (
                    <tr key={test.id} className="border-b hover:bg-gray-50">
                      <td className="p-2">{test.id}</td>
                      <td className="p-2">{test.name}</td>
                      {/* <td className="p-2">{test.price}</td> */}
                      <td className="p-2 text-right">
                        {test.price ? `${test.price.toLocaleString()} đ` : '0 đ'}
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
            )}
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
                    {/* <th className="p-2 text-left">Nhóm XN</th> */}
                  </tr>
                </thead>
                <tbody>
                  {selectedTests.map((test, index) => (
                    <tr key={test.id} className="border-b">
                      <td className="p-2">{index + 1}</td>
                      <td className="p-2">{test.id}</td>
                      <td className="p-2">{test.name}</td>
                      {/* <td className="p-2">{test.unit}</td> */}
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