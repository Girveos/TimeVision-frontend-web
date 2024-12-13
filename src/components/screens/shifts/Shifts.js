import { Button, Checkbox, Input, message, Tag } from "antd";
import Header from "../../organisms/header/Header";
import "./Shifts.css";
import { useEffect, useState } from "react";
import Table from "../../organisms/table/Table";
import { useEmployeeStore } from "../../../config/store";
import { UserOutlined } from "@ant-design/icons";
import { shiftsAssigments } from "../../../config/routes";
import { useNavigate } from "react-router-dom";

export default function Shifts() {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { employees, isLoading, error, fetchEmployees } = useEmployeeStore();

  const [formData, setFormData] = useState({
    startDate: null,
    endDate: null,
    restriction1: false,
    restriction2: false,
    restriction3: false,
    employeeIds: [],
  });

  const handleChange = (field, value) => {
    setFormData((prevState) => {
      const updatedFormData = {
        ...prevState,
        [field]: value,
      };

      return updatedFormData;
    });
  };

  const handleCheckboxChange = (field, e) => {
    handleChange(field, e.target.checked);
  };


  const navigate = useNavigate();
  
  
  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const handleSelectUser = (employeeId) => {
    setSelectedUsers((prevSelected) => {
      if (prevSelected.includes(employeeId)) {
        return prevSelected.filter((id) => id !== employeeId);
      } else {
        return [...prevSelected, employeeId];
      }
    });
  };

  const totalRows = employees.length;
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = employees.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1);
  };

  const onSubmit = async () => {
    try {
      const formattedStart = new Date(formData.startDate).toISOString();
    const formattedEnd = new Date(formData.endDate).toISOString();

    const payload = {
      ...formData,
      startDate: formattedStart,
      endDate: formattedEnd,
      employeeIds: selectedUsers,
    };

    console.log("TURNOS", payload);

    const response = await shiftsAssigments(payload);

    if (response.success) {
      message.success("Turnos asignados con éxito");
      navigate("/calendar")
    }else {
      message.error("Error al asignar los turnos. Intent de nuevo.")
    }
    } catch (error) {
      console.error("Error al enviar datos para la asignación:", error);
    }
  };

  const columns = ["", "Empleado", "Correo", "Activo", "Cargo"];

  const renderTableRow = (employee) => (
    <tr key={employee._id}>
      <td>
      <Checkbox
          checked={selectedUsers.includes(employee._id)}
          onChange={() => handleSelectUser(employee._id)}
        />
      </td>
      <td>{`${employee.name} ${employee.lastname}`}</td>
      <td>{employee.email}</td>
      <td>
        <Tag color={employee.active === true ? "green" : "red"}>
          <UserOutlined />
        </Tag>
      </td>
      <td>{employee.position}</td>
    </tr>
  );

  const onChange = (checkedValues) => {
    console.log("checked = ", checkedValues);
  };

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="shiftsScreen">
      <Header title={"Turnos"} user={user} />
      <div className="body-shifts">
        <div className="section-filter">
          <div className="date-range-assingment">
            <h2>Rango de asignación</h2>
            <div className="date-picker">
              <div className="date-range">
                <span className="range-date-subtitle">Desde</span>
                <div className="date-selector">
                  <Input
                    type="date"
                    onChange={(e) => handleChange("startDate", e.target.value)}
                    placeholder="DD/MM/AAAA"
                  />
                </div>
              </div>
              <div className="range-date">
                <span className="range-date-subtitle">Hasta</span>
                <div className="range-options">
                  <div className="date-selector">
                    <Input
                      type="date"
                      onChange={(e) => handleChange("endDate", e.target.value)}
                      placeholder="DD/MM/AAAA"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="conditions">
            <h2>Condiciones de asignación</h2>
            <div className="checkbox-group">
              <div>
                <label>
                  <Checkbox  onChange={(e) => handleCheckboxChange("restriction1", e)} /> {""}
                  Evitar trasnocho semanal consecutivo
                </label>
                <label>
                  <Checkbox onChange={(e) => handleCheckboxChange("restriction2", e)} /> {""}
                  Un único turno por empleado los fines de semana
                </label>
              </div>
              <div>
                <label>
                  <Checkbox onChange={(e) => handleCheckboxChange("restriction3", e)} /> {""}
                  Evitar turno fin de semana si trasnocha en semana
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="table-section">
          <h2 className="Title-Seccion">Selección de usuarios</h2>
          <div className="user-selection">
            <Table
              headers={columns}
              data={currentRows}
              currentPage={currentPage}
              rowsPerPage={rowsPerPage}
              totalRows={totalRows}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              renderTableRow={renderTableRow}
            />
          </div>
        </div>
        <div className="assign-button-container">
          <Button
            className="assign-button"
            disabled={selectedUsers.length === 0}
            onClick={onSubmit}
          >
            Asignar turnos
          </Button>
        </div>
      </div>
    </div>
  );
}
