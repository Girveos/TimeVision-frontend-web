import React, { useState } from "react";
import "./DayDetail.css";
import { format, isSameDay } from "date-fns";
import { es } from "date-fns/locale";

const DayDetail = ({ 
  date, 
  schedule, 
  employees, 
  onDragStart,
  onDragEnd,
  onDrop,
  isDragging
}) => {
  const [expandedShift, setExpandedShift] = useState(null);
  const [expandedDay, setExpandedDay] = useState(null);
  
  const handleDragOver = (e) => {
    e.preventDefault();
    if (!isSameDay(expandedDay, date)) {
      setExpandedDay(date);
      setExpandedShift(null);
    }
  };

  const handleShiftClick = (shiftId) => {
    if (!isDragging) {
      if (expandedShift === shiftId) {
        setExpandedShift(null);
      } else {
        setExpandedShift(shiftId);
        setExpandedDay(date);
      }
    }
  };

  const generateColor = (index, total) => {
    const hue = (index * (360 / total)) % 360;
    return {
      main: `hsl(${hue}, 70%, 45%)`,
      light: `hsl(${hue}, 70%, 95%)`
    };
  };

  const getDayShifts = () => {
    const dayKey = format(date, 'EEEE', { locale: es })
      .toLowerCase()
      .replace('é', 'e')
      .replace('á', 'a');
    
    const dayMap = {
      'lunes': 'monday',
      'martes': 'tuesday',
      'miercoles': 'wednesday',
      'jueves': 'thursday',
      'viernes': 'friday',
      'sabado': 'saturday',
      'domingo': 'sunday'
    };
    
    return schedule[dayMap[dayKey]]?.shifts || [];
  };

  const getEmployeesForShift = (shiftId) => {
    const currentDate = format(date, 'yyyy-MM-dd');
    return (employees[currentDate]?.[shiftId] || []);
  };

  const shifts = getDayShifts();
  const totalShifts = shifts.length;

  return (
    <div 
      className="day-detail"
      onDragOver={handleDragOver}
    >
      <div className="day-detail-header">
        <h3>{format(date, 'EEEE d MMMM yyyy', { locale: es })}</h3>
      </div>
      <div className="shifts-list">
        {shifts.map((shift, index) => {
          const colors = generateColor(index, totalShifts);
          const isExpanded = expandedShift === shift.id;
          const shiftEmployees = getEmployeesForShift(shift.id);
          
          return (
            <div 
              key={shift.id} 
              className={`shift-card ${isExpanded ? 'expanded' : ''}`}
              onClick={() => handleShiftClick(shift.id)}
              onDragOver={handleDragOver}
              onDrop={(e) => {
                e.preventDefault();
                onDrop(shift.id, date);
              }}
              style={{
                borderLeft: `4px solid ${colors.main}`,
                backgroundColor: colors.light
              }}
            >
              <div className="shift-header">
                <div className="shift-name">{shift.name}</div>
                <div className="shift-time">
                  {shift.startTime} - {shift.endTime}
                </div>
              </div>
              
              {isExpanded && (
                <div className="employees-list">
                  {shiftEmployees.map(employee => (
                    <div
                      key={employee.id}
                      className="employee-card"
                      draggable
                      onDragStart={(e) => {
                        e.stopPropagation();
                        onDragStart(employee, shift.id, date);
                      }}
                      onDragEnd={onDragEnd}
                    >
                      <div className="employee-avatar">{employee.avatar}</div>
                      <div className="employee-name">{employee.name}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DayDetail; 