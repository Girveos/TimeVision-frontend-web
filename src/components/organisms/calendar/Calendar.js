import React, { useState } from "react";
import "./Calendar.css";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek
} from "date-fns";
import { es } from "date-fns/locale";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const Calendar = ({ onDateSelect, selectedDate, currentMonth, onMonthChange }) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
  
  const monthDays = eachDayOfInterval({ 
    start: calendarStart, 
    end: calendarEnd 
  });

  const handlePrevMonth = () => {
    onMonthChange(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    onMonthChange(addMonths(currentMonth, 1));
  };

  const handleDayClick = (date) => {
    onDateSelect(date);
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button className="month-button" onClick={handlePrevMonth}>
          <ChevronLeftIcon />
        </button>
        <h2>{format(currentMonth, 'MMMM yyyy', { locale: es })}</h2>
        <button className="month-button" onClick={handleNextMonth}>
          <ChevronRightIcon />
        </button>
      </div>

      <div className="calendar-grid">
        <div className="weekday-header">
          {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map(day => (
            <div key={day} className="weekday">{day}</div>
          ))}
        </div>
        <div className="days-grid">
          {monthDays.map(day => (
            <div
              key={day.toString()}
              className={`day ${
                !isSameMonth(day, currentMonth) ? 'different-month' : ''
              } ${isSameDay(day, selectedDate) ? 'selected' : ''}`}
              onClick={() => handleDayClick(day)}
            >
              {format(day, 'd')}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;