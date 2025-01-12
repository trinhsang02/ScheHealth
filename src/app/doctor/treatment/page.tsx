"use client";

import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { ChevronLeft, HelpCircle } from "lucide-react";
import ClsModal from "../ClsModal";
import PrescriptionModal from "../Prescription";
import {
  Invoice,
  Medicine,
  MedicinePrescription,
} from "../../../services/api/models";
import {
  getPatientById,
  getPatientProfile,
} from "@/services/api/patientService";
import {
  createMedicalRecord,
  isMedicalRecordExist,
  updateMedicalRecordDiagnosis,
  updateMedicalRecordPaymentStatus,
} from "@/services/api/medicalRecordService";
import authService from "@/services/api/authService";
import { createInvoice } from "@/services/api/invoiceService";
import { createMedicinePrescription } from "@/services/api/medicineService";
import {
  updateAppointmentStatus,
  updateAppointmentTreatmentStatus,
} from "@/services/api/appointmentService";

interface VitalSign {
  label: string;
  value: string;
  unit: string;
  required?: boolean;
  type?: "text" | "number";
  step?: string;
}

interface Test {
  id: string;
  name: string;
  unit: string;
  price: number;
}

export default function MedicalExaminationPage() {
  const searchParams = useSearchParams();
  const patientId = searchParams.get("patientId");
  const appointmentId = searchParams.get("appointmentId");
  const medicalRecordId = searchParams.get("medicalRecordId");
  const userData = authService.getUserData();
  console.log("userData", userData);
  // State management
  const [vitalSigns, setVitalSigns] = useState<Record<string, string>>({
    nhiệtđộ: "",
    huyếtáp: "",
    nhịptim: "",
    spo2: "",
    cânnặng: "",
    chiềucao: "",
    bloodPressureSystolic: "",
    bloodPressureDiastolic: "",
  });

  const [medicalHistory, setMedicalHistory] = useState("");
  const [clinicalExamination, setClinicalExamination] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [examinationReason, setExaminationReason] = useState("");

  // CLS Modal states
  const [showClsModal, setShowClsModal] = useState(false);
  const [selectedTests, setSelectedTests] = useState<Test[]>([]);

  // Prescription Modal states
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [selectedMedications, setSelectedMedications] = useState<Medicine[]>(
    []
  );

  // Add patient info state
  const [patientInfo, setPatientInfo] = useState({
    name: "",
    gender: "",
    dob: "",
    phone: "",
    address: "",
  });

  // Load patient data when component mounts
  useEffect(() => {
    const loadPatientData = async () => {
      if (patientId) {
        try {
          const patientData = await getPatientById(Number(patientId));
          console.log(patientData);
          setPatientInfo({
            name: patientData.name,
            gender: patientData.gender.toString() === "1" ? "Nam" : "Nữ",
            dob: patientData.birthday,
            phone: patientData.phone,
            address: patientData.address,
          });
        } catch (error) {
          console.error("Error loading patient data:", error);
          // Handle error appropriately
        }
      }
    };

    loadPatientData();
  }, [patientId]);

  // Vital Signs Configuration
  const vitalSignsConfig: VitalSign[] = [
    {
      label: "Nhiệt độ",
      value: vitalSigns.nhiệtđộ,
      unit: "°C",
      required: true,
      type: "number",
      step: "0.1",
    },
    {
      label: "Huyết áp",
      value: `${vitalSigns.huyếtáp}/${vitalSigns.huyếtáp}`,
      unit: "mmHg",
      required: true,
    },
    {
      label: "Nhịp tim",
      value: vitalSigns.nhịptim,
      unit: "bpm",
      required: true,
    },
    {
      label: "SpO2",
      value: vitalSigns.spo2,
      unit: "%",
      required: true,
    },
    {
      label: "Cân nặng",
      value: vitalSigns.cânnặng,
      unit: "kg",
    },
    {
      label: "Chiều cao",
      value: vitalSigns.chiềucao,
      unit: "cm",
    },
  ];

  // Handlers
  const handleVitalSignChange = (key: string, value: string) => {
    setVitalSigns((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleClsModalSave = async (tests: Test[]) => {
    try {
      console.log("cls modal save - tests:", JSON.stringify(tests, null, 2));
      setSelectedTests(tests);
      setShowClsModal(false);

      const invoiceData: Invoice = {
        id: 0,
        medical_record_id: Number(medicalRecordId),
        total_price: tests.reduce((sum, test) => sum + test.price, 0),
        service_ids: tests.map((test) => Number(test.id)),
      };

      const invoiceResponse = await createInvoice(invoiceData);
      console.log("invoiceResponse:", invoiceResponse);
    } catch (error) {
      console.error("Error in handleClsModalSave:", error);
      // Add proper error handling here
    }
  };

  const handlePrescriptionModalSave = async (medications: Medicine[]) => {
    setSelectedMedications(medications);
    console.log("selectedMedications", selectedMedications);
    setShowPrescriptionModal(false);
    const medicinePrescriptionData: MedicinePrescription = {
      id: 0,
      medical_record_id: Number(medicalRecordId),
      medicine_ids: medications.map((med) => med.id),
      quantity: medications.length,
    };
    const response = await createMedicinePrescription(medicinePrescriptionData);
    console.log("response", response);
  };

  const renderVitalSignInput = (sign: VitalSign, index: number) => {
    const isBloodPressure = sign.label === "Huyết áp";

    if (isBloodPressure) {
      return (
        <div key={index} className="vital-sign">
          <label className={`${sign.required ? "required" : ""}`}>
            {sign.label}
          </label>
          <div className="blood-pressure-inputs">
            <input
              type="number"
              className="vital-input"
              placeholder="Tâm thu"
              value={vitalSigns.bloodPressureSystolic}
              onChange={(e) =>
                handleVitalSignChange("bloodPressureSystolic", e.target.value)
              }
            />
            <span className="blood-pressure-separator">/</span>
            <input
              type="number"
              className="vital-input"
              placeholder="Tâm trương"
              value={vitalSigns.bloodPressureDiastolic}
              onChange={(e) =>
                handleVitalSignChange("bloodPressureDiastolic", e.target.value)
              }
            />
            <span className="vital-unit">{sign.unit}</span>
          </div>
        </div>
      );
    }

    const stateKey = sign.label
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s/g, "");

    return (
      <div key={index} className="vital-sign">
        <label className={`${sign.required ? "required" : ""}`}>
          {sign.label}
        </label>
        <div className="vital-input-group">
          <input
            type={sign.type || "text"}
            step={sign.step}
            className="vital-input"
            placeholder={sign.label}
            value={vitalSigns[stateKey] || ""}
            onChange={(e) => handleVitalSignChange(stateKey, e.target.value)}
          />
          <span className="vital-unit">{sign.unit}</span>
        </div>
      </div>
    );
  };

  const handleSaveExamination = async () => {
    try {
      console.log("Saving examination");
      const userData = authService.getUserData();
      if (!userData?.id) {
        throw new Error("Không tìm thấy thông tin bác sĩ");
      }

      console.log("Medical Record ID:", medicalRecordId);
      // Cập nhật diagnosis trong medical record
      const updateResponse = await updateMedicalRecordDiagnosis(
        Number(medicalRecordId),
        diagnosis // diagnosis là state từ component
      );
      if (!updateResponse.success) {
        throw new Error("Không thể cập nhật chuẩn đoán");
      }

      const updateAppointmentResponse = await updateAppointmentTreatmentStatus(
        Number(appointmentId),
        "completed"
      );
      console.log("updateAppointmentResponse", updateAppointmentResponse);
      if (!updateAppointmentResponse.success) {
        throw new Error("Không thể cập nhật trạng thái khám");
      }

      const updateMedicalRecordPaymentStatusResponse =
        await updateMedicalRecordPaymentStatus(Number(medicalRecordId));
      if (!updateMedicalRecordPaymentStatusResponse.success) {
        throw new Error("Không thể cập nhật trạng thái thanh toán");
      }
      console.log(
        "updateMedicalRecordPaymentStatusResponse",
        updateMedicalRecordPaymentStatusResponse
      );

      // Collect và log toàn bộ dữ liệu khám
      const examinationData = {
        patientInfo,
        vitalSigns,
        medicalHistory,
        examinationReason,
        clinicalExamination,
        diagnosis,
        selectedTests,
        selectedMedications,
      };
      console.log("Đã lưu thông tin khám bệnh:", examinationData);
      alert("Đã lưu thông tin khám bệnh thành công");
    } catch (error) {
      console.error("Lỗi khi lưu thông tin:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Có lỗi xảy ra khi lưu thông tin"
      );
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <a
          href="#"
          className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
        >
          <ChevronLeft size={16} />
          Phòng Khám SE100
        </a>
        <a
          href="#"
          className="text-gray-700 hover:text-blue-600 flex items-center gap-1"
        >
          <HelpCircle size={16} />
          Help
        </a>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-4 mb-6">
        {[
          { label: "Khám bệnh", active: true },
          {
            label: "Chỉ đỉnh CLS",
            active: false,
            onClick: () => setShowClsModal(true),
          },
          {
            label: "Đơn thuốc",
            active: false,
            onClick: () => setShowPrescriptionModal(true),
          },
        ].map((tab, index) => (
          <button
            key={index}
            onClick={tab.onClick}
            className={`
              px-4 py-2 rounded-lg text-sm 
              ${
                tab.active
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700"
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Patient Information Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Thông tin bệnh nhân
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(patientInfo).map(([key, value], index) => (
            <div key={index} className="mb-4">
              <label className="block text-sm text-gray-600 mb-2">
                {
                  {
                    name: "Họ tên",
                    gender: "Giới tính",
                    dob: "Ngày sinh",
                    phone: "Số điện thoại",
                    address: "Địa chỉ",
                  }[key]
                }
              </label>
              <input
                type="text"
                value={value}
                readOnly
                className="w-full px-3 py-2 bg-gray-100 rounded-lg text-gray-800"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Vital Signs Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Chỉ số</h2>

        {/* Vital Signs Grid */}
        <div className="grid grid-cols-3 gap-4 mb-6 bg-gray-100 rounded-lg p-4">
          {vitalSignsConfig.map(renderVitalSignInput)}
        </div>

        {/* Medical Details */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-2 required">
              Lý do khám
            </label>
            <textarea
              rows={3}
              placeholder="Nhập lý do khám"
              value={examinationReason}
              onChange={(e) => setExaminationReason(e.target.value)}
              className="w-full px-3 py-2 bg-gray-100 rounded-lg"
            />
          </div>

          <div>
            {/* <label className="block text-sm text-gray-600 mb-2 required">
              Tiền sử bệnh
            </label> */}
            {/* <div className="border rounded-lg overflow-hidden"> */}
            {/* <div className="bg-gray-100 p-2 flex gap-2">
                <button className="hover:bg-gray-200 p-1 rounded">B</button>
                <button className="hover:bg-gray-200 p-1 rounded">I</button>
                <button className="hover:bg-gray-200 p-1 rounded">U</button>
                <button className="hover:bg-gray-200 p-1 rounded">List</button>
              </div> */}
            {/* <textarea 
                rows={4} 
                value={medicalHistory}
                onChange={(e) => setMedicalHistory(e.target.value)}
                placeholder="Nhập tiền sử bệnh" 
                className="w-full px-3 py-2 bg-white"
              /> */}
            {/* </div> */}
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-2 required">
              Khám lâm sàng
            </label>
            <textarea
              rows={4}
              value={clinicalExamination}
              onChange={(e) => setClinicalExamination(e.target.value)}
              placeholder="Nhập kết quả khám lâm sàng"
              className="w-full px-3 py-2 bg-gray-100 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Chẩn đoán
            </label>
            <textarea
              rows={3}
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              placeholder="Nhập chẩn đoán"
              className="w-full px-3 py-2 bg-gray-100 rounded-lg"
            />
          </div>

          {/* Selected Tests Preview */}
          {selectedTests.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-3">
                Các xét nghiệm đã chọn
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedTests.map((test) => (
                  <span
                    key={test.id}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                  >
                    {test.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={handleSaveExamination}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg float-right hover:bg-blue-700 transition"
          >
            Lưu thông tin
          </button>
        </div>
      </div>

      {/* CLS Modal */}
      {showClsModal && (
        <ClsModal
          onClose={() => setShowClsModal(false)}
          onSave={(tests) => {
            handleClsModalSave(tests);
          }}
          patientName={patientInfo.name}
          patientDob={patientInfo.dob}
          patientGender={patientInfo.gender}
          patientId={Number(patientId)}
        />
      )}

      {/* Prescription Modal */}
      {showPrescriptionModal && (
        <PrescriptionModal
          onClose={() => setShowPrescriptionModal(false)}
          onSave={handlePrescriptionModalSave}
          patientName={patientInfo.name}
          patientDob={patientInfo.dob}
          patientGender={patientInfo.gender}
        />
      )}
    </div>
  );
}
