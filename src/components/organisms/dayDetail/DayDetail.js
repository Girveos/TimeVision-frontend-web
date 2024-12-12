import React, { useState } from "react";
import "./DayDetail.css";
import { format, isSameDay, addDays, subDays } from "date-fns";
import { es } from "date-fns/locale";
import UserModal from "../userModal/UserModal";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const DayDetail = ({ 
  date, 
  schedule, 
  employees, 
  onDragStart,
  onDragEnd,
  onDrop,
  isDragging,
  onDateSelect
}) => {
  const [expandedShift, setExpandedShift] = useState(null);
  const [expandedDay, setExpandedDay] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  
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
      main: `hsl(${hue}, 70%, 50%)`,
      light: `hsl(${hue}, 70%, 95%)`
    };
  };

  const getDayShifts = () => {
    const dayKey = format(date, 'EEEE', { locale: es })
      .toLowerCase()
      .replace('é', 'e')
      .replace('á', 'a');
    
    const currentDate = format(date, 'yyyy-MM-dd');

    const shiftsWithEmployees = schedule[dayKey]?.shifts.filter(shift => {
      const hasEmployees = (employees[currentDate]?.[shift.id]?.length || 0) > 0;
      return hasEmployees;
    }) || [];

    return shiftsWithEmployees;
  };

  const getEmployeesForShift = (shiftId) => {
    const currentDate = format(date, 'yyyy-MM-dd');
    const employeesInShift = employees[currentDate]?.[shiftId] || [];
    return employeesInShift;
  };

  const shifts = getDayShifts();
  const totalShifts = shifts.length;

  const handleEmployeeClick = (e, employee) => {
    e.stopPropagation();
    setSelectedEmployee(employee);
  };

  const handlePrevDay = () => {
    const newDate = subDays(date, 1);
    onDateSelect(newDate);
  };

  const handleNextDay = () => {
    const newDate = addDays(date, 1);
    onDateSelect(newDate);
  };

  return (
    <>
      <div className="day-detail" onDragOver={handleDragOver}>
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
                        onClick={(e) => handleEmployeeClick(e, employee)}
                      >
                        <div className="employee-avatar">
                          {employee.photo ? (
                            <img 
                              src={employee.photo} 
                              alt={employee.name}
                              className="employee-avatar-img"
                            />
                          ) : (
                            employee.name.substring(0, 2).toUpperCase()
                          )}
                        </div>
                        <div className="employee-name">{employee.name}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="day-navigation">
          <button className="day-nav-button prev" onClick={handlePrevDay}>
            <ChevronLeftIcon /> Día anterior
          </button>
          <button className="day-nav-button next" onClick={handleNextDay}>
            Día siguiente <ChevronRightIcon />
          </button>
        </div>
      </div>
      
      {selectedEmployee && (
        <UserModal 
          user={selectedEmployee} 
          onClose={() => setSelectedEmployee(null)} 
        />
      )}
    </>
  );
};

export default DayDetail;