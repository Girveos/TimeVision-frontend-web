import React, { useState, useEffect } from "react";
import "./CalendarScreen.css";
import Header from "../../organisms/header/Header";
import Calendar from "../../organisms/calendar/Calendar";
import DayDetail from "../../organisms/dayDetail/DayDetail";
import { getShifts, getUserById, getShiftById } from "../../../config/routes";
import { format } from "date-fns";

const CalendarScreen = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [draggedEmployee, setDraggedEmployee] = useState(null);
  const [employees, setEmployees] = useState({
    [format(new Date(), 'yyyy-MM-dd')]: {
      1: [], // Mañana
      2: [], // Tarde
      3: []  // Noche
    }
  });
  const [assignments, setAssignments] = useState([]);
  
  // Estado para los empleados
  const [schedule, setSchedule] = useState({
    monday: {
      shifts: [
        { id: 1, startTime: '06:00', endTime: '14:00', name: 'Turno Mañana' },
        { id: 2, startTime: '14:00', endTime: '22:00', name: 'Turno Tarde' },
        { id: 3, startTime: '22:00', endTime: '06:00', name: 'Turno Noche' },
      ]
    },
    tuesday: {
      shifts: [
        { id: 1, startTime: '06:00', endTime: '14:00', name: 'Turno Mañana' },
        { id: 2, startTime: '14:00', endTime: '22:00', name: 'Turno Tarde' },
        { id: 3, startTime: '22:00', endTime: '06:00', name: 'Turno Noche' }
      ]
    },
    wednesday: {
      shifts: [
        { id: 1, startTime: '06:00', endTime: '14:00', name: 'Turno Mañana' },
        { id: 2, startTime: '14:00', endTime: '22:00', name: 'Turno Tarde' },
        { id: 3, startTime: '22:00', endTime: '06:00', name: 'Turno Noche' }
      ]
    },
    thursday: {
      shifts: [
        { id: 1, startTime: '06:00', endTime: '14:00', name: 'Turno Mañana' },
        { id: 2, startTime: '14:00', endTime: '22:00', name: 'Turno Tarde' },
        { id: 3, startTime: '22:00', endTime: '06:00', name: 'Turno Noche' }
      ]
    },
    friday: {
      shifts: [
        { id: 1, startTime: '06:00', endTime: '14:00', name: 'Turno Mañana' },
        { id: 2, startTime: '14:00', endTime: '22:00', name: 'Turno Tarde' },
        { id: 3, startTime: '22:00', endTime: '06:00', name: 'Turno Noche' }
      ]
    },
    saturday: {
      shifts: [
        { id: 1, startTime: '06:00', endTime: '14:00', name: 'Turno Mañana' },
        { id: 2, startTime: '14:00', endTime: '22:00', name: 'Turno Tarde' },
        { id: 3, startTime: '22:00', endTime: '06:00', name: 'Turno Noche' }
      ]
    },
    sunday: {
      shifts: [
        { id: 1, startTime: '06:00', endTime: '14:00', name: 'Turno Mañana' },
        { id: 2, startTime: '14:00', endTime: '22:00', name: 'Turno Tarde' },
        { id: 3, startTime: '22:00', endTime: '06:00', name: 'Turno Noche' }
      ]
    }
  });

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const result = await getShifts();
        if (result.success) {
          
          // Organizamos los empleados por fecha y turno
          const employeesByDateAndShift = {};
          
          for (const assignment of result.data) {
            try {
              // Obtenemos información del usuario y del turno
              const [userResult, shiftResult] = await Promise.all([
                getUserById(assignment.id_user),
                getShiftById(assignment.id_shift)
              ]);
              
              
              if (userResult.success && shiftResult.success) {
                const shiftData = shiftResult.data;
                
                // Verificamos que tengamos las fechas
                if (!shiftData || !shiftData.start_date) {
                  console.error('Turno sin fecha válida:', shiftData);
                  continue;
                }

                // Convertimos la fecha de inicio
                const startDate = new Date(shiftData.start_date);
                
                // Verificamos si la fecha es válida
                if (isNaN(startDate.getTime())) {
                  console.error('Fecha inválida:', shiftData.start_date);
                  continue;
                }

                const formattedDate = format(startDate, 'yyyy-MM-dd');
                const startHour = startDate.getHours();
                
                // Determinamos el ID del turno basado en la hora de inicio
                let frontendShiftId;
                if (startHour >= 6 && startHour < 14) {
                  frontendShiftId = 1; // Mañana
                } else if (startHour >= 14 && startHour < 22) {
                  frontendShiftId = 2; // Tarde
                } else {
                  frontendShiftId = 3; // Noche
                }
                
                // Inicializamos la estructura si no existe
                if (!employeesByDateAndShift[formattedDate]) {
                  employeesByDateAndShift[formattedDate] = {
                    1: [], // Mañana
                    2: [], // Tarde
                    3: []  // Noche
                  };
                }
                
                // Agregamos el empleado al turno correspondiente
                employeesByDateAndShift[formattedDate][frontendShiftId].push({
                  id: assignment.id_user,
                  name: `${userResult.data.name} ${userResult.data.lastname}`,
                  photo: userResult.data.photo || null,
                  position: userResult.data.position,
                  email: userResult.data.email,
                  telephone: userResult.data.telephone,
                  type_doc: userResult.data.type_doc,
                  num_doc: userResult.data.num_doc,
                  department: userResult.data.id_department,
                  active: userResult.data.active,
                  firstname: userResult.data.name,
                  lastname: userResult.data.lastname
                });

              }
            } catch (error) {
              console.error("Error procesando asignación:", error);
              console.error("Detalles del error:", {
                assignment,
                error: error.message
              });
            }
          }
          
          setEmployees(employeesByDateAndShift);
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
        // Actualizamos el estado local
        const newEmployees = { ...employees };
        
        // Remover empleado del turno original
        if (newEmployees[draggedEmployee.originalShiftId]) {
          newEmployees[draggedEmployee.originalShiftId] = 
            newEmployees[draggedEmployee.originalShiftId]
              .filter(emp => emp.id !== draggedEmployee.id);
        }
        
        // Inicializar el nuevo turno si no existe
        if (!newEmployees[newShiftId]) {
          newEmployees[newShiftId] = [];
        }
        
        // Agregar empleado al nuevo turno
        newEmployees[newShiftId].push({
          id: draggedEmployee.id,
          name: draggedEmployee.name,
          avatar: draggedEmployee.avatar
        });
        
        setEmployees(newEmployees);
        
        // Aquí podrías agregar la lógica para actualizar en el backend
        // Por ejemplo:
        // await updateAssignment(draggedEmployee.id, newShiftId);
        
      } catch (error) {
        console.error("Error al actualizar asignación:", error);
      }
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
