import React, { useState } from "react";
import "./Tickets.css";
import { FaSearch } from "react-icons/fa";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

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
    solicitud.empleado.toLowerCase().includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredSolicitudes.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredSolicitudes.slice(
    indexOfFirstRow,
    indexOfLastRow
  );

  const handleOpenModal = (solicitud) => {
    setSelectedSolicitud(solicitud);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedSolicitud(null);
  };

  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
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
  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setOpenImageModal(true);
  };

  const handleCloseImageModal = () => {
    setOpenImageModal(false);
    setSelectedImage("");
  };

  return (
    <div className="solicitudes-container">
      <header className="header">
        <h1>Solicitudes</h1>
      </header>

      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Buscar un empleado"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <table className="solicitudes-table">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Empleado</th>
            <th>Tipo de solicitud</th>
            <th>Estado</th>
            <th>Detalles</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((solicitud) => (
            <tr key={solicitud.id}>
              <td>{solicitud.fecha}</td>
              <td>{solicitud.empleado}</td>
              <td>{solicitud.tipo}</td>
              <td>{solicitud.estado}</td>
              <td>
                <button
                  className="details-btn"
                  onClick={() => handleOpenModal(solicitud)}
                >
                  Ver más
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Stack spacing={2} className="pagination-container">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          siblingCount={1}
          boundaryCount={1}
          hidePrevButton
          hideNextButton
          shape="rounded"
        />
      </Stack>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box className="modal-box">
          {selectedSolicitud && (
            <>
              <h2>Detalles de la solicitud</h2>
              <p className="detalle-item">
                <span className="label">Empleado:</span>{" "}
                {selectedSolicitud.empleado}
              </p>
              <p className="detalle-item">
                <span className="label">Fecha:</span> {selectedSolicitud.fecha}
              </p>
              <p className="detalle-item">
                <span className="label">Tipo:</span> {selectedSolicitud.tipo}
              </p>
              <p className="detalle-item">
                <span className="label">Estado:</span>{" "}
                {selectedSolicitud.estado}
              </p>
              <p className="detalle-item">
                <span className="label">Descripción:</span>{" "}
                {selectedSolicitud.descripcion}
              </p>
              {selectedSolicitud.imagen && (
                <img
                  src={selectedSolicitud.imagen}
                  alt="Solicitud"
                  className="modal-image"
                  onClick={() => handleImageClick(selectedSolicitud.imagen)}
                />
              )}
              <div className="modal-buttons">
                <button
                  className="accept-btn"
                  onClick={() => handleAccept(selectedSolicitud.id)}
                >
                  Aceptar
                </button>
                <button
                  className="reject-btn"
                  onClick={() => handleReject(selectedSolicitud.id)}
                >
                  Rechazar
                </button>
              </div>
            </>
          )}
        </Box>
      </Modal>

      {/* Modal para ampliar la imagen */}
      <Modal open={openImageModal} onClose={handleCloseImageModal}>
        <Box className="modal-image-box">
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Imagen Ampliada"
              className="full-size-image"
              onClick={handleCloseImageModal}
            />
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default Tickets;
