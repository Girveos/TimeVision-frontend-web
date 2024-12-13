import React, { useState, useEffect } from "react";
import "./CalendarScreen.css";
import Header from "../../organisms/header/Header";
import Calendar from "../../organisms/calendar/Calendar";
import DayDetail from "../../organisms/dayDetail/DayDetail";
import { getShifts } from "../../../config/routes";
import { format } from "date-fns";

const CalendarScreen = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [draggedEmployee, setDraggedEmployee] = useState(null);
  const [employees, setEmployees] = useState({});
  const [schedule, setSchedule] = useState({});

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const loadingTimeout = setTimeout(() => {
        }, 500);

        const result = await getShifts();

        if (result.success && result.data) {
          const processedData = processAssignments(result.data);

          sessionStorage.setItem('calendarData', JSON.stringify({
            schedule: processedData.scheduleByDay,
            employees: processedData.employeesByDateAndShift,
            timestamp: Date.now()
          }));

          setSchedule(processedData.scheduleByDay);
          setEmployees(processedData.employeesByDateAndShift);
          clearTimeout(loadingTimeout);
        } else {
          console.error('Error en la respuesta:', result);
        }
      } catch (error) {
        console.error("Error al cargar asignaciones:", error);
      }
    };

    fetchAssignments();
  }, []);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    if (format(date, 'M') !== format(currentMonth, 'M')) {
      setCurrentMonth(date);
    }
  };

  const handleDragStart = (employee, shiftId, date) => {
    setDraggedEmployee({
      ...employee,
      originalShiftId: shiftId,
      originalDate: date
    });
  };

  const handleDragEnd = () => {
    setDraggedEmployee(null);
  };

  const handleDrop = async (newShiftId, newDate) => {
    if (draggedEmployee) {
      try {
        const newEmployees = { ...employees };
        
        if (newEmployees[draggedEmployee.originalShiftId]) {
          newEmployees[draggedEmployee.originalShiftId] = 
            newEmployees[draggedEmployee.originalShiftId]
              .filter(emp => emp.id !== draggedEmployee.id);
        }
        
        if (!newEmployees[newShiftId]) {
          newEmployees[newShiftId] = [];
        }
        
        newEmployees[newShiftId].push({
          id: draggedEmployee.id,
          name: draggedEmployee.name,
          avatar: draggedEmployee.avatar
        });
        
        setEmployees(newEmployees);
        
      } catch (error) {
        console.error("Error al actualizar asignación:", error);
      }
    }
  };

  const processAssignments = (assignmentsData) => {
    const assignments = Array.isArray(assignmentsData) ? assignmentsData : [];

    const scheduleByDay = {
      lunes: { shifts: [] },
      martes: { shifts: [] },
      miercoles: { shifts: [] },
      jueves: { shifts: [] },
      viernes: { shifts: [] },
      sabado: { shifts: [] },
      domingo: { shifts: [] }
    };
    
    const employeesByDateAndShift = {};

    if (assignments.length === 0) {
      return { scheduleByDay, employeesByDateAndShift };
    }

    try {
      const uniqueShifts = new Map();
      assignments.forEach(assignment => {
        if (!uniqueShifts.has(assignment.id_shift) && assignment.shift) {
          const startTime = assignment.shift.start_date.split('T')[1].substring(0, 5);
          const endTime = assignment.shift.end_date.split('T')[1].substring(0, 5);
          
          const shift = {
            id: assignment.id_shift,
            name: assignment.shift.name_shift || 'Sin nombre',
            startTime: startTime,
            endTime: endTime,
            startHour: parseInt(startTime.split(':')[0]),
            startMinute: parseInt(startTime.split(':')[1])
          };
          uniqueShifts.set(assignment.id_shift, shift);
        }
      });

      const sortedShifts = Array.from(uniqueShifts.values()).sort((a, b) => {
        if (a.startHour === b.startHour) {
          return a.startMinute - b.startMinute;
        }
        return a.startHour - b.startHour;
      });

      Object.keys(scheduleByDay).forEach(day => {
        scheduleByDay[day].shifts = sortedShifts;
      });

      assignments.forEach(assignment => {
        if (!assignment.shift?.start_date || !assignment.user) return;

        try {
          const date = format(new Date(assignment.shift.start_date), 'yyyy-MM-dd');
          
          if (!employeesByDateAndShift[date]) {
            employeesByDateAndShift[date] = {};
          }
          
          if (!employeesByDateAndShift[date][assignment.id_shift]) {
            employeesByDateAndShift[date][assignment.id_shift] = [];
          }

          const employeeExists = employeesByDateAndShift[date][assignment.id_shift]
            .some(emp => emp.id === assignment.user._id);

          if (!employeeExists && assignment.user) {
            employeesByDateAndShift[date][assignment.id_shift].push({
              id: assignment.user._id,
              name: `${assignment.user.name} ${assignment.user.lastname}`,
              photo: assignment.user.photo || null,
              email: assignment.user.email || '',
              position: assignment.user.position || '',
              telephone: assignment.user.telephone || ''
            });
          }
        } catch (error) {
          console.error('Error procesando asignación:', error);
        }
      });

      return { scheduleByDay, employeesByDateAndShift };
    } catch (error) {
      console.error('Error en processAssignments:', error);
      return { scheduleByDay, employeesByDateAndShift };
    }
  };

  return (
    <div className="calendarScreen">
      <Header title={"Calendario"} user={user} />
      <div className="body-calendar">
        <div className="calendar-container">
          <Calendar 
            onDateSelect={handleDateSelect}
            selectedDate={selectedDate}
            currentMonth={currentMonth}
            onMonthChange={setCurrentMonth}
          />
          <DayDetail 
            date={selectedDate}
            schedule={schedule}
            employees={employees}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDrop={handleDrop}
            isDragging={!!draggedEmployee}
            onDateSelect={handleDateSelect}
          />
        </div>
      </div>
    </div>
  );
};

export default CalendarScreen;