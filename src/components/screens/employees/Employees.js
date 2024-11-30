import React, { useEffect, useState } from "react";
import "./Employees.css";
import Header from "../../organisms/header/Header";
import { Button } from "antd";
import SearchBar from "../../organisms/searchBar/SearchBar";
import { getUsers } from "../../../config/routes";
import { UserAddOutlined } from "@ant-design/icons";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedEmpleado, setSelectedEmpleado] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await getUsers();
        if (response.success) {
          const data = response.data;
          setEmployees(data);
        }
      } catch (err) {
        console.error("Error al obtener los usuarios:", err);
      }
    };

    fetchEmployees();
  }, []);

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

    return nombre.includes(searchTerm) || apellido.includes(searchTerm) || cargo.includes(searchTerm);
  });

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedEmpleado(null);
  };

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="employeesScreen">
      <Header title={"Empleados"} user={user} />
      <div className="body-employees">
        <div className="actions-bar">
          <Button className="create-btn">
            <UserAddOutlined /> Crear usuario
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
              <div className="employee-card" key={employee._id}>
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
    </div>
  );
};

export default Employees;
