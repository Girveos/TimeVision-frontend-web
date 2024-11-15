import "./Shifts.css";
import { useState } from "react";

export default function Shifts() {
  const [activeRange, setActiveRange] = useState("week");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const handleRangeClick = (range) => {
    setActiveRange(range);
  };
  const handleSelectUser = (userName) => {
    setSelectedUsers((prevSelected) => {
      if (prevSelected.includes(userName)) {
        return prevSelected.filter((user) => user !== userName);
      } else {
        return [...prevSelected, userName];
      }
    });
  };

  return (
    <div className="container">
      <h1 className="title">Turnos</h1>
      <div className="filters">
        <div className="filter-section">
          <h2>Rango de asignación</h2>
          <div className="date-picker">
            <div className="date-range">
              <span>Desde</span>
              <div className="date-selector">
                <input type="date" />
              </div>
            </div>
            <div className="range-date">
              <span>Hasta</span>
              <div className="range-options">
                <button
                  className={activeRange === "day" ? "active" : ""}
                  onClick={() => handleRangeClick("day")}
                >
                  Día
                </button>
                <button
                  className={activeRange === "week" ? "active" : ""}
                  onClick={() => handleRangeClick("week")}
                >
                  Semana
                </button>
                <button
                  className={activeRange === "month" ? "active" : ""}
                  onClick={() => handleRangeClick("month")}
                >
                  Mes
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="filter-section">
          <h2>Condiciones de asignación</h2>
          <div className="checkbox-group">
            <label>
              <input type="checkbox" />
              Turno nocturno semanal sin repetición
            </label>
            <label>
              <input type="checkbox" />
              Turno tarde semanal sin repetición
            </label>
            <label>
              <input type="checkbox" />
              Turno mañana semanal sin repetición
            </label>
            <label>
              <input type="checkbox" />
              Restricciones de trabajo en equipo
            </label>
          </div>
        </div>
      </div>
      <h2 className="Title-Seccion">Selección de usuarios</h2>
      <div className="user-selection">
        <table className="table">
          <thead className="title-table">
            <tr>
              <th></th>
              <th>Empleado</th>
              <th>Estado</th>
              <th>Cargo</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                name: "Ana Lopera",
                status: "Pendiente",
                position: "Analista nivel 1",
              },
              {
                name: "Carlos",
                status: "Pendiente",
                position: "Analista nivel 2",
              },
              {
                name: "Ana Lopera",
                status: "Pendiente",
                position: "Analista nivel 3",
              },
              {
                name: "Pepita",
                status: "Pendiente",
                position: "Analista nivel 1",
              },
            ].map((user) => (
              <tr key={user.name}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.name)}
                    onChange={() => handleSelectUser(user.name)}
                  />
                </td>
                <td>{user.name}</td>
                <td>{user.status}</td>
                <td>{user.position}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="assign-button-container">
        <button className="assign-button" disabled={selectedUsers.length === 0}>
          Asignar turnos
        </button>
      </div>
    </div>
  );
}
