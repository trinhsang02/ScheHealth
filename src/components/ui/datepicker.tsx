'use client'
import React, { useState } from 'react';
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from 'lucide-react';

interface DatePickerProps {
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
}

const DatePicker = ({ date, onDateChange }: DatePickerProps) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    const today = new Date();
    if (selectedDate && selectedDate > today) {
      onDateChange(selectedDate);
      setIsCalendarOpen(false);
    } else {
      alert(`Vui lòng chọn sau ngày ${today.toLocaleDateString()}.`);
    }
  };

  return (
    <div className="relative w-full">
      <Button
        onClick={() => setIsCalendarOpen(!isCalendarOpen)}
        variant="outline"
        className="w-full justify-start text-left font-normal"
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        {date ? format(date, "yyyy-MM-dd") : "Chọn ngày"}
      </Button>
      
      {isCalendarOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-md z-[9999]">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            initialFocus
          />
        </div>
      )}
    </div>
  );
};