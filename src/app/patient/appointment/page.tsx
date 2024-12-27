'use client'

import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { CalendarIcon } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const AppointmentForm = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  const handleDateSelect = (selectedDate: Date | undefined) => {
    const today = new Date();
    if (selectedDate && selectedDate > today) {
      setDate(selectedDate);
    } else {
      alert(`Vui lòng chọn sau ngày ${today.toLocaleDateString()}.`);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl p-6">

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


        {/* Chọn ngày khám */}
        <div>
          <h2 className="text-lg font-medium mb-3">Chọn ngày giờ khám</h2>
        </div>
        <div className="space-y-2">
          <Label htmlFor="dob">Vui lòng chọn ngày phù hợp với bạn</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="dob"
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "dd/MM/yyyy") : "Chọn ngày"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Button
            className="w-full hover:blue-60"
            disabled={!date}
            variant="system"
          >
            Đặt lịch ngay
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentForm;
