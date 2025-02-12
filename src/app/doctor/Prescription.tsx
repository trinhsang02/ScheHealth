"use client";

import React, { useState, useEffect } from "react";
import { Printer, Search, XCircle, X } from "lucide-react";
import { fetchAllMedicines } from "../../services/api/medicineService";

interface Medication {
  id: number;
  name: string;
  description: string;
  price: number;
  unit: string;
  manufacture_date: string;
  expiry_date: string;
  side_effects: string;
  dosage: string;
}

interface PrescriptionModalProps {
  onClose: () => void;
  patientName: string;
  patientDob: string;
  patientGender: string;
  onSave?: (medications: Medication[]) => void;
}

export default function PrescriptionModal({
  onClose,
  patientName,
  patientDob,
  patientGender,
  onSave,
}: PrescriptionModalProps) {
  const [selectedMedications, setSelectedMedications] = useState<Medication[]>(
    []
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [medications, setMedications] = useState<Medication[]>([]);

  useEffect(() => {
    const loadMedications = async () => {
      try {
        const data = await fetchAllMedicines();
        setMedications(data);
      } catch (error) {
        console.error("Error fetching medications:", error);
      }
    };
    loadMedications();
  }, []);

  const filteredMedications = medications.filter(
    (med) =>
      med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.id.toString().includes(searchTerm)
  );

  const handleMedicationSelect = (medication: Medication) => {
    if (!selectedMedications.find((m) => m.id === medication.id)) {
      setSelectedMedications([...selectedMedications, medication]);
    }
  };

  const removeSelectedMedication = (medicationId: number) => {
    setSelectedMedications(
      selectedMedications.filter((med) => med.id !== medicationId)
    );
  };

  const handleSave = () => {
    onSave && onSave(selectedMedications);
    onClose();
  };

  return (
    <>
      {/* Main Prescription Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-white rounded-lg w-[90%] max-w-4xl max-h-[90vh] overflow-auto">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-semibold">Kê Đơn Thuốc</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setShowPrintModal(true)}
                className="btn bg-green-500 text-white flex items-center gap-2 px-4 py-2 rounded"
              >
                <Printer size={16} />
                In đơn thuốc
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
              { label: "Bệnh nhân", value: patientName },
              { label: "Ngày sinh", value: patientDob },
              { label: "Giới tính", value: patientGender },
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
              placeholder="Tìm kiếm thuốc..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-3 py-2 border rounded"
            />
            <button className="btn bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2">
              <Search size={16} />
              Tìm kiếm
            </button>
          </div>

          {/* Selected Medications */}
          {selectedMedications.length > 0 && (
            <div className="p-4 bg-gray-50 flex flex-wrap gap-2">
              {selectedMedications.map((med) => (
                <div
                  key={med.id}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center gap-2"
                >
                  {med.name}
                  <button onClick={() => removeSelectedMedication(med.id)}>
                    <XCircle size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Medications Table */}
          <div className="p-4">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-center">Mã Thuốc</th>
                  <th className="p-2 text-left">Tên Thuốc</th>
                  <th className="p-2 text-left">Đơn Vị</th>
                  <th className="p-2 text-left">Liều Lượng</th>

                  <th className="p-2 text-center">Thao Tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredMedications.map((med) => (
                  <tr
                    key={med.id}
                    className="border-b hover:bg-gray-50 relative group"
                    title={`Tác dụng phụ: ${med.side_effects}`}
                  >
                    <td className="p-2 text-center">{med.id}</td>
                    <td className="p-2">{med.name}</td>
                    <td className="p-2">{med.unit}</td>
                    <td className="p-2">{med.dosage}</td>
                    <td className="p-2 text-center relative">
                      <button
                        onClick={() => handleMedicationSelect(med)}
                        className="text-blue-500 hover:bg-blue-100 px-2 py-1 rounded"
                      >
                        Chọn
                      </button>

                      <div className="hidden group-hover:block absolute z-50 bg-gray-500 text-white p-2 rounded text-sm w-64 left-1/2 transform -translate-x-1/2 -translate-y-full top-0">
                        <p className="font-semibold">Tác dụng phụ:</p>
                        <p>{med.side_effects}</p>
                      </div>
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
              Lưu đơn thuốc
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
              <h3 className="text-xl font-bold">BỆNH VIỆN SE100</h3>
              <h3 className="text-lg font-semibold">ĐƠN THUỐC</h3>
              <p className="text-sm text-gray-600">Số đơn: DT-2024-001</p>
            </div>

            <div className="bg-gray-50 p-4 rounded mb-6">
              <div className="grid grid-cols-2 gap-4">
                <p>
                  <strong>Họ tên:</strong> {patientName}
                </p>
                <p>
                  <strong>Ngày sinh:</strong> {patientDob}
                </p>
                <p>
                  <strong>Giới tính:</strong> {patientGender}
                </p>
                <p>
                  <strong>Địa chỉ:</strong> Hà Nội
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Danh sách thuốc:</h4>
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 text-left">STT</th>
                    <th className="p-2 text-left">Mã Thuốc</th>
                    <th className="p-2 text-left">Tên Thuốc</th>
                    <th className="p-2 text-left">Liều Lượng</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedMedications.map((med, index) => (
                    <tr key={med.id} className="border-b">
                      <td className="p-2">{index + 1}</td>
                      <td className="p-2">{med.id}</td>
                      <td className="p-2">{med.name}</td>
                      <td className="p-2">{med.dosage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-right mt-8">
              <p>Ngày ... tháng ... năm 2024</p>
              <p className="mt-4">Bác sĩ kê đơn</p>
              <p className="mt-16">(Ký và ghi rõ họ tên)</p>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => window.print()}
                className="btn bg-blue-500 text-white px-6 py-2 rounded flex items-center gap-2 mx-auto"
              >
                <Printer size={16} />
                In đơn thuốc
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
