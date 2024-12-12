import React, { useEffect, useState } from "react";
import "./Employees.css";
import Header from "../../organisms/header/Header";
import { Button, Spin } from "antd";
import SearchBar from "../../organisms/searchBar/SearchBar";
import { UserAddOutlined } from "@ant-design/icons";
import { EmployeeEditModal } from "../../organisms/modal/DetailModal";
import { useNavigate } from "react-router-dom";
import { useEmployeeStore } from "../../../config/store";

const Employees = () => {
  const { 
    employees, 
    isLoading, 
    error, 
    fetchEmployees 
  } = useEmployeeStore();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedEmpleado, setSelectedEmpleado] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const navigate = useNavigate();

  const handleNavigate = (id) => {
    navigate("/create-user");
  };

  const getInitials = (name) => {
    if (!name) return "";
    const nameParts = name.split(" ");
    return nameParts.map((part) => part[0].toUpperCase()).join("");
  };

  const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
  };

  const filteredEmpleados = employees.filter((employee) => {
    const nombre = employee.name?.toLowerCase() || "";
    const apellido = employee.lastname?.toLowerCase() || "";
    const cargo = employee.position?.toLowerCase() || "";

    return (
      nombre.includes(searchTerm) ||
      apellido.includes(searchTerm) ||
      cargo.includes(searchTerm)
    );
  });

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedEmpleado(null);
  };

  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
  };

  const user = JSON.parse(localStorage.getItem("user"));

  if (isLoading) {
    return (
      <div className="loading-container">
        <Spin size="large" tip="Cargando empleados..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="employeesScreen">
      <Header title={"Empleados"} user={user} />
      <div className="body-employees">
        <div className="actions-bar">
          <Button className="go-create-btn" onClick={handleNavigate}>
            <UserAddOutlined /> <span className="create-span">Crear usuario</span>
          </Button>
          <div className="search-bar-div">
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
              placeholder="Buscar"
            />
          </div>
        </div>
        <div className="employees-grid">
          {filteredEmpleados.length > 0 ? (
            filteredEmpleados.map((employee) => (
              <div
                className="employee-card"
                key={employee._id}
                onClick={() => {
                  setSelectedEmpleado(employee);
                  setOpenModal(true);
                }}
              >
                <div
                  className={`active-user-circle ${
                    employee.active ? "bg-active" : "bg-inactive"
                  }`}
                ></div>
                {employee.photo ? (
                  <img
                    src={employee.photo}
                    alt={employee.name}
                    className="employee-photo"
                  />
                ) : (
                  <div className="initials-profile">
                    {getInitials(`${employee.name} ${employee.lastname}`)}
                  </div>
                )}
                <div className="card-info">
                  <p>{`${employee.name} ${employee.lastname}`}</p>
                  <p>{employee.email}</p>
                  <p className="position">{employee.position}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="no-results">No se encontraron coincidencias.</p>
          )}
        </div>
      </div>
      <EmployeeEditModal
        open={openModal}
        onClose={handleCloseModal}
        data={selectedEmpleado}
      />
    </div>
  );
};

export default Employees;
