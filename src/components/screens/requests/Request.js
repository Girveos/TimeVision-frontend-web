import React, { useEffect, useState } from "react";
import "./Request.css";
import Table from "../../organisms/table/Table";
import SearchBar from "../../organisms/searchBar/SearchBar";
import { Modaldetail, ImageModal } from "../../organisms/modal/DetailModal";
import Header from "../../organisms/header/Header";
import { FileSearchOutlined } from "@ant-design/icons";
import { Tag } from "antd";
import { getRequest } from "../../../config/routes";

const Request = () => {
  const [solicitudes, setSolicitudes] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getRequest();
        console.log(response.data);
        if (response.success) {
          const sortedRequests = response.data.sort((a, b) => new Date(b.start_date) - new Date(a.start_date));

          setSolicitudes(sortedRequests);
        }
      } catch (err) {
        console.error("Error al obtener el usuario:", err);
      }
    };

    fetchUserData();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;
  const [openModal, setOpenModal] = useState(false);
  const [selectedSolicitud, setSelectedSolicitud] = useState(null);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
  };

  const filteredSolicitudes = solicitudes.filter((solicitud) => {
    const empleado = solicitud.user_name?.toLowerCase() || "";
    const tipo = solicitud.type?.toLowerCase() || "";
    const estado = solicitud.state?.toLowerCase() || "";

    return (
      empleado.includes(searchTerm) ||
      tipo.includes(searchTerm) ||
      estado.includes(searchTerm)
    );
  });

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

  const handleAccept = (_id) => {
    const updatedSolicitudes = solicitudes.map((solicitud) =>
      solicitud._id === _id ? { ...solicitud, state: "Aceptada" } : solicitud
    );
    setSolicitudes(updatedSolicitudes);
  };

  const handleReject = (_id) => {
    const updatedSolicitudes = solicitudes.map((solicitud) =>
      solicitud._id === _id ? { ...solicitud, state: "Rechazada" } : solicitud
    );
    setSolicitudes(updatedSolicitudes);
    handleCloseModal();
  };

  const columns = [
    "Fecha",
    "Empleado",
    "Tipo de solicitud",
    "Estado",
    "Detalles",
  ];

  const renderTableRow = (solicitud) => (
    <tr key={solicitud._id}>
      <td>{new Date(solicitud.start_date).toISOString().split('T')[0]}</td>
      <td>{solicitud.user_name}</td>
      <td>{solicitud.type}</td>
      <td>
        <Tag
          color={
            solicitud.state.toLowerCase() === "aceptada"
              ? "green"
              : solicitud.state.toLowerCase() === "rechazada"
              ? "red"
              : "orange"
          }
        >
          {solicitud.state}
        </Tag>
      </td>
      <td>
        <FileSearchOutlined
          className="verMas-icon"
          onClick={() => {
            setSelectedSolicitud(solicitud);
            setOpenModal(true);
          }}
        />
      </td>
    </tr>
  );

  const renderModalContent = (solicitud) => (
    <>
      <h2>Detalles de la solicitud</h2>
      <p className="detalle-item">
        <span className="label">Empleado:</span> {solicitud.user_name}
      </p>
      <p className="detalle-item">
        <span className="label">Fecha:</span> {solicitud.start_date}
      </p>
      <p className="detalle-item">
        <span className="label">Tipo:</span> {solicitud.type}
      </p>
      <p className="detalle-item">
        <span className="label">Estado:</span> {solicitud.state}
      </p>
      <p className="detalle-item">
        <span className="label">Descripción:</span> {solicitud.description}
      </p>
      {solicitud.attach && (
        <img
          src={solicitud.attach}
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

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="requestsScreen">
      <Header title={"Solicitudes"} user={user} />
      <div className="searchBar-container">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          placeholder="Buscar"
        />
      </div>
      <div className="solicitudes-container">
        <Table
          headers={columns}
          data={currentRows}
          currentPage={currentPage}
          totalPages={filteredSolicitudes.length}
          onPageChange={(_, page) => setCurrentPage(page)}
          renderTableRow={renderTableRow}
        />
        <Modaldetail
          open={openModal}
          onClose={() => setOpenModal(false)}
          data={selectedSolicitud}
          onAccept={handleAccept}
          onReject={handleReject}
          renderContent={renderModalContent}
        />
        <ImageModal
          open={openImageModal}
          onClose={() => setOpenImageModal(false)}
          imageUrl={selectedImage}
        />
      </div>
    </div>
  );
};

export default Request;
