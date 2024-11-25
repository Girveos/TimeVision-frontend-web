import React, { useState } from "react";
import "./Licenses.css";
import Table from "../../organisms/table/Table";
import SearchBar from "../../organisms/searchBar/SearchBar";
import { DetailModal } from "../../organisms/modal/DetailModal";
import Header from "../../organisms/header/Header";

const Licenses = () => {
  const licencias = [
    {
      id: 1,
      empleado: "Ana Lopera",
      licencia: "No remunerada",
      inicio: "1/09/2024",
      fin: "05/09/2024",
      duracion: "5 días",
      estado: "Rechazada",
    },
    {
      id: 2,
      empleado: "Juan Perez",
      licencia: "Remunerada",
      inicio: "10/10/2024",
      fin: "15/10/2024",
      duracion: "5 días",
      estado: "Aprobada",
    },
    {
      id: 3,
      empleado: "Ana Lopera",
      licencia: "No remunerada",
      inicio: "1/09/2024",
      fin: "05/09/2024",
      duracion: "5 días",
      estado: "Pendiente",
    },
    {
      id: 4,
      empleado: "Carlos Gomez",
      licencia: "Remunerada",
      inicio: "5/09/2024",
      fin: "10/09/2024",
      duracion: "5 días",
      estado: "Aprobada",
    },
    {
      id: 5,
      empleado: "Ana Lopera",
      licencia: "No remunerada",
      inicio: "1/09/2024",
      fin: "05/09/2024",
      duracion: "5 días",
      estado: "Rechazada",
    },
    {
      id: 6,
      empleado: "Luis Martinez",
      licencia: "No remunerada",
      inicio: "1/09/2024",
      fin: "05/09/2024",
      duracion: "5 días",
      estado: "Pendiente",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 4;
  const [openModal, setOpenModal] = useState(false);
  const [selectedLicencias, setSelectedLicencias] = useState(null);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredLicenses = licencias.filter(
    (licencia) =>
      licencia.empleado.toLowerCase().includes(searchTerm) ||
      licencia.estado.toLowerCase().includes(searchTerm) ||
      licencia.licencia.toLowerCase().includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredLicenses.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredLicenses.slice(indexOfFirstRow, indexOfLastRow);

  const tableHeaders = [
    "Empleado",
    "Tipo de Licencia",
    "Fecha Inicio",
    "Fecha Fin",
    "Duracion",
    "Estado",
    "Detalles",
  ];

  const renderTableRow = (licencias) => (
    <tr key={licencias.id}>
      <td>{licencias.empleado}</td>
      <td>{licencias.licencia}</td>
      <td>{licencias.inicio}</td>
      <td>{licencias.fin}</td>
      <td>{licencias.duracion}</td>
      <td>{licencias.estado}</td>
      <td>
        <button
          className="details-btn"
          onClick={() => {
            setSelectedLicencias(licencias);
            setOpenModal(true);
          }}
        >
          Ver más
        </button>
      </td>
    </tr>
  );
  const renderModalContent = (licencias) => (
    <>
      <h2>Detalles de la licencias</h2>
      <p className="detalle-item">
        <span className="label">Empleado:</span> {licencias.empleado}
      </p>
      <p className="detalle-item">
        <span className="label">Tipo de Licencia:</span> {licencias.licencia}
      </p>
      <p className="detalle-item">
        <span className="label">Fecha de incio:</span> {licencias.inicio}
      </p>
      <p className="detalle-item">
        <span className="label">Fecha de Fin:</span> {licencias.fin}
      </p>
      <p className="detalle-item">
        <span className="label">Duracion:</span> {licencias.duracion}
      </p>
      <p className="detalle-item">
        <span className="label">Estado:</span> {licencias.estado}
      </p>
    </>
  );

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="licensesScreen">
      <Header title={"Licencias"} user={user} />
      <div className="licenses-container">
        <header className="header">
          <h1>Licencias</h1>
        </header>
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          placeholder="Buscar"
        />
        <Table
          headers={tableHeaders}
          data={currentRows}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(_, page) => setCurrentPage(page)}
          renderTableRow={renderTableRow}
        />
        <DetailModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          data={selectedLicencias}
          renderContent={renderModalContent}
        />
      </div>
    </div>
  );
};

export default Licenses;
