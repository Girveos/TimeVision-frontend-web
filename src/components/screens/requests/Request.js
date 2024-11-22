import React, { useState } from "react";
import "./Request.css";
import Table from '../../organisms/table/Table';
import SearchBar from '../../organisms/searchBar/SearchBar';
import {Modaldetail, ImageModal} from '../../organisms/modal/DetailModal';

const Tickets = () => {
  const [solicitudes, setSolicitudes] = useState([
    {
      id: 1,
      fecha: "12/09/2024",
      empleado: "Ana Lopera",
      tipo: "Vacaciones",
      estado: "Pendiente",
      descripcion: "Vacaciones",
      imagen:
        "https://images.pexels.com/photos/8402676/pexels-photo-8402676.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    },
    {
      id: 2,
      fecha: "12/09/2024",
      empleado: "Carlos",
      tipo: "Días libres",
      estado: "Pendiente",
      descripcion: "Días libres",
      imagen:
        "https://images.pexels.com/photos/8402676/pexels-photo-8402676.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    },
    {
      id: 3,
      fecha: "10/09/2024",
      empleado: "Ana Lopera",
      tipo: "Vacaciones",
      estado: "Pendiente",
      descripcion: "Vacaciones",
      imagen:
        "https://images.pexels.com/photos/8402676/pexels-photo-8402676.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    },
    {
      id: 4,
      fecha: "09/09/2024",
      empleado: "Carlos",
      tipo: "Días libres",
      estado: "Pendiente",
      descripcion: "Días libres",
      imagen:
        "https://images.pexels.com/photos/8402676/pexels-photo-8402676.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    },
    {
      id: 5,
      fecha: "12/09/2024",
      empleado: "Ana Lopera",
      tipo: "Vacaciones",
      estado: "Pendiente",
      descripcion: "Vacaciones",
      imagen:
        "https://images.pexels.com/photos/8402676/pexels-photo-8402676.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    },
    {
      id: 6,
      fecha: "12/09/2024",
      empleado: "Carlos",
      tipo: "Días libres",
      estado: "Pendiente",
      descripcion: "Días libres",
      imagen:
        "https://images.pexels.com/photos/8402676/pexels-photo-8402676.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    },
    {
      id: 7,
      fecha: "10/09/2024",
      empleado: "Ana Lopera",
      tipo: "Vacaciones",
      estado: "Pendiente",
      descripcion: "Vacaciones",
      imagen:
        "https://images.pexels.com/photos/8402676/pexels-photo-8402676.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    },
    {
      id: 8,
      fecha: "09/09/2024",
      empleado: "Carlos",
      tipo: "Días libres",
      estado: "Pendiente",
      descripcion: "Días libres",
      imagen:
        "https://images.pexels.com/photos/8402676/pexels-photo-8402676.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 4;
  const [openModal, setOpenModal] = useState(false);
  const [selectedSolicitud, setSelectedSolicitud] = useState(null);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
  };

  const filteredSolicitudes = solicitudes.filter((solicitud) =>
    solicitud.empleado.toLowerCase().includes(searchTerm) ||
    solicitud.tipo.toLowerCase().includes(searchTerm) ||
    solicitud.estado.toLowerCase().includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredSolicitudes.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredSolicitudes.slice(
    indexOfFirstRow,
    indexOfLastRow
  );

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedSolicitud(null);
  };

  const handleAccept = (id) => {
    const updatedSolicitudes = solicitudes.map((solicitud) =>
      solicitud.id === id ? { ...solicitud, estado: "Aceptada" } : solicitud
    );
    setSolicitudes(updatedSolicitudes);
    handleCloseModal();
  };

  const handleReject = (id) => {
    const updatedSolicitudes = solicitudes.map((solicitud) =>
      solicitud.id === id ? { ...solicitud, estado: "Rechazada" } : solicitud
    );
    setSolicitudes(updatedSolicitudes);
    handleCloseModal();
  };

  const tableHeaders = ["Fecha", "Empleado", "Tipo de solicitud", "Estado", "Detalles"];

  const renderTableRow = (solicitud) => (
    <tr key={solicitud.id}>
      <td>{solicitud.fecha}</td>
      <td>{solicitud.empleado}</td>
      <td>{solicitud.tipo}</td>
      <td>{solicitud.estado}</td>
      <td>
        <button
          className="details-btn"
          onClick={() => {
            setSelectedSolicitud(solicitud);
            setOpenModal(true);
          }}
        >
          Ver más
        </button>
      </td>
    </tr>
  );

  const renderModalContent = (solicitud) => (
    <>
      <h2>Detalles de la solicitud</h2>
      <p className="detalle-item">
        <span className="label">Empleado:</span> {solicitud.empleado}
      </p>
      <p className="detalle-item">
        <span className="label">Fecha:</span> {solicitud.fecha}
      </p>
      <p className="detalle-item">
        <span className="label">Tipo:</span> {solicitud.tipo}
      </p>
      <p className="detalle-item">
        <span className="label">Estado:</span> {solicitud.estado}
      </p>
      <p className="detalle-item">
        <span className="label">Descripción:</span> {solicitud.descripcion}
      </p>
      {solicitud.imagen && (
        <img
          src={solicitud.imagen}
          alt="Solicitud"
          className="modal-image"
          onClick={() => {
            setSelectedImage(solicitud.imagen);
            setOpenImageModal(true);
          }}
        />
      )}
    </>
  );
  

  return (
    <div className="solicitudes-container">
      <header className="header">
        <h1>Solicitudes</h1>
      </header>
      <SearchBar 
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        placeholder= "Buscar"
      />
      <Table 
        headers={tableHeaders}
        data={currentRows}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(_, page) => setCurrentPage(page)}
        renderTableRow={renderTableRow}      
      />

      <Modaldetail 
        open={openModal}
        onClose={()=> setOpenModal(false)}
        data={selectedSolicitud}
        onAccept={handleAccept}
        onReject={handleReject}
        renderContent={renderModalContent}
      />
      <ImageModal 
        open={openImageModal}
        onClose={()=> setOpenImageModal(false)}
        imageUrl={selectedImage}
      
      />
    </div>
  );
};

export default Tickets;