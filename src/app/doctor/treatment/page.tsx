"use client";

import React, { useState } from 'react';
import { ChevronLeft, HelpCircle } from 'lucide-react';
import ClsModal from "../ClsModal";
import PrescriptionModal from '../Prescription';
import { Medicine } from '../../../services/api/models';
import { getPatientProfile } from '@/services/api/patientService';


interface VitalSign {
  label: string;
  value: string;
  unit: string;
  required?: boolean;
  type?: 'text' | 'number';
  step?: string;
}

interface Test {
  id: string;
  name: string;
  unit: string;
  price: number;
}

export default function MedicalExaminationPage() {
  // State management
  const [vitalSigns, setVitalSigns] = useState<Record<string, string>>({
    temperature: '',
    bloodPressureSystolic: '',
    bloodPressureDiastolic: '',
    heartRate: '',
    spO2: '',
    weight: '',
    height: ''
  });

  const [medicalHistory, setMedicalHistory] = useState('');
  const [clinicalExamination, setClinicalExamination] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [examinationReason, setExaminationReason] = useState('');

  // CLS Modal states
  const [showClsModal, setShowClsModal] = useState(false);
  const [selectedTests, setSelectedTests] = useState<Test[]>([]);

  // Prescription Modal states
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [selectedMedications, setSelectedMedications] = useState<Medicine[]>([]);
  
  // Patient information
  const patientInfo = {
    name: 'Nguyễn Văn A',
    gender: 'Nam',
    dob: '01/01/1990',
    phone: '0123456789',
    address: 'Hà Nội'
  };

  // Vital Signs Configuration
  const vitalSignsConfig: VitalSign[] = [
    { 
      label: 'Nhiệt độ', 
      value: vitalSigns.temperature, 
      unit: '°C', 
      required: true, 
      type: 'number', 
      step: '0.1' 
    },
    { 
      label: 'Huyết áp', 
      value: `${vitalSigns.bloodPressureSystolic}/${vitalSigns.bloodPressureDiastolic}`, 
      unit: 'mmHg', 
      required: true 
    },
    { 
      label: 'Nhịp tim', 
      value: vitalSigns.heartRate, 
      unit: 'bpm', 
      required: true 
    },
    { 
      label: 'SpO2', 
      value: vitalSigns.spO2, 
      unit: '%', 
      required: true 
    },
    { 
      label: 'Cân nặng', 
      value: vitalSigns.weight, 
      unit: 'kg' 
    },
    { 
      label: 'Chiều cao', 
      value: vitalSigns.height, 
      unit: 'cm' 
    }
  ];

  // Handlers
  const handleVitalSignChange = (key: string, value: string) => {
    setVitalSigns(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleClsModalSave = (tests: Test[]) => {
    setSelectedTests(tests);
    setShowClsModal(false);
  };

  const handlePrescriptionModalSave = (medications: Medicine[]) => {
    setSelectedMedications(medications);
    setShowPrescriptionModal(false);
  };

  const renderVitalSignInput = (sign: VitalSign, index: number) => {
    const isBloodPressure = sign.label === 'Huyết áp';

    if (isBloodPressure) {
      return (
        <div key={index} className="vital-sign">
          <label className={`${sign.required ? 'required' : ''}`}>
            {sign.label}
          </label>
          <div className="blood-pressure-inputs">
            <input 
              type="number" 
              className="vital-input" 
              placeholder="Tâm thu"
              value={vitalSigns.bloodPressureSystolic}
              onChange={(e) => handleVitalSignChange('bloodPressureSystolic', e.target.value)}
            />
            <span className="blood-pressure-separator">/</span>
            <input 
              type="number" 
              className="vital-input" 
              placeholder="Tâm trương"
              value={vitalSigns.bloodPressureDiastolic}
              onChange={(e) => handleVitalSignChange('bloodPressureDiastolic', e.target.value)}
            />
            <span className="vital-unit">{sign.unit}</span>
          </div>
        </div>
      );
    }

    return (
      <div key={index} className="vital-sign">
        <label className={`${sign.required ? 'required' : ''}`}>
          {sign.label}
        </label>
        <div className="vital-input-group">
          <input 
            type={sign.type || 'text'} 
            step={sign.step}
            className="vital-input" 
            placeholder={sign.label}
            value={vitalSigns[sign.label.toLowerCase().replace(/\s/g, '')]}
            onChange={(e) => handleVitalSignChange(
              sign.label.toLowerCase().replace(/\s/g, ''), 
              e.target.value
            )}
          />
          <span className="vital-unit">{sign.unit}</span>
        </div>
      </div>
    );
  };

  const handleSaveExamination = () => {
    // Collect all examination data
    const examinationData = {
      patientInfo,
      vitalSigns,
      medicalHistory,
      examinationReason,
      clinicalExamination,
      diagnosis,
      selectedTests,
      selectedMedications
    };

    // TODO: Implement actual save logic (e.g., API call)
    console.log('Saving examination data:', examinationData);
    alert('Đã lưu thông tin khám bệnh');
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
          <ChevronLeft size={16} />
          Phòng Khám SE100
        </a>
        <a href="#" className="text-gray-700 hover:text-blue-600 flex items-center gap-1">
          <HelpCircle size={16} />
          Help
        </a>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-4 mb-6">
        {[
          { label: 'Khám bệnh', active: true },
          { 
            label: 'Chỉ đỉnh CLS', 
            active: false, 
            onClick: () => setShowClsModal(true) 
          },
          { 
            label: 'Đơn thuốc', 
            active: false, 
            onClick: () => setShowPrescriptionModal(true) 
          },
          { label: 'Hoàn thành', active: false, success: true }
        ].map((tab, index) => (
          <button 
            key={index} 
            onClick={tab.onClick}
            className={`
              px-4 py-2 rounded-lg text-sm 
              ${tab.active ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}
              ${tab.success ? 'bg-green-600 text-white' : ''}
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
                    name: 'Họ tên',
                    gender: 'Giới tính',
                    dob: 'Ngày sinh',
                    phone: 'Số điện thoại',
                    address: 'Địa chỉ'
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
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Chỉ số
        </h2>
        
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
              <h3 className="text-lg font-semibold mb-3">Các xét nghiệm đã chọn</h3>
              <div className="flex flex-wrap gap-2">
                {selectedTests.map(test => (
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
          onSave={handleClsModalSave}
          patientName={patientInfo.name}
          patientDob={patientInfo.dob}
          patientGender={patientInfo.gender}
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