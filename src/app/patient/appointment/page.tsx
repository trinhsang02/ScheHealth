'use client'

import React, { useState } from 'react';

const AppointmentForm = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const dates = [
    { day: 'Th 4', date: '27/11' },
    { day: 'Th 5', date: '28/11' },
    { day: 'Th 6', date: '29/11' },
    { day: 'Th 7', date: '30/11' },
  ];

  const times = ['14:00', '15:00', '16:00', '17:00'];

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl p-6">
        <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
          <span>Đến với</span>
          <span className="font-medium">Đặt khám</span>
        </div>

        <h1 className="text-xl font-bold mb-6">Chọn lịch khám</h1>

        {/* Form Thông tin cá nhân */}
        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Họ</label>
              <input
                type="text"
                className="w-full p-3 rounded-lg bg-gray-100"
                placeholder="Jane"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Tên</label>
              <input
                type="text"
                className="w-full p-3 rounded-lg bg-gray-100"
                placeholder="Doe"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full p-3 rounded-lg bg-gray-100"
              placeholder="jane.doe@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Số điện thoại</label>
            <input
              type="tel"
              className="w-full p-3 rounded-lg bg-gray-100"
              placeholder="(+84) 456-7890"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Địa chỉ</label>
            <input
              type="text"
              className="w-full p-3 rounded-lg bg-gray-100"
              placeholder="Địa chỉ của bạn"
            />
          </div>
        </div>

        {/* Chọn ngày giờ khám */}
        <div>
          <h2 className="text-lg font-medium mb-4">Chọn ngày giờ khám</h2>
          <p className="text-sm text-gray-500 mb-4">Vui lòng chọn ngày và giờ phù hợp với bạn</p>

          <div className="grid grid-cols-4 gap-3 mb-6">
            {dates.map((date) => (
              <div
                key={date.date}
                className={`text-center p-3 border rounded-lg cursor-pointer ${selectedDate === date.date ? 'bg-blue-50 border-blue-500' : ''}`}
                onClick={() => setSelectedDate(date.date)}
              >
                <div className="text-sm">{date.day}</div>
                <div className="font-medium">{date.date}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-4 gap-3">
            {times.map((time) => (
              <button
                key={time}
                className={`p-3 text-center border rounded-lg cursor-pointer ${selectedTime === time ? 'bg-blue-50 border-blue-500' : ''}`}
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        <button
          className={`w-full bg-blue-600 text-white rounded-lg p-3 mt-6 ${!selectedDate || !selectedTime ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!selectedDate || !selectedTime}
        >
          Xác nhận lịch hẹn
        </button>
      </div>
    </div>
  );
};

export default AppointmentForm;
