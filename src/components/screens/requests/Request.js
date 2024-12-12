import React, { useEffect } from "react";
import "./Request.css";
import Table from "../../organisms/table/Table";
import SearchBar from "../../organisms/searchBar/SearchBar";
import { Modaldetail, ImageModal } from "../../organisms/modal/DetailModal";
import Header from "../../organisms/header/Header";
import { FileSearchOutlined } from "@ant-design/icons";
import { Tag, Spin } from "antd";
import { useRequestStore } from "../../../config/store";

const Request = () => {
  const { 
    requests, 
    isLoading, 
    error, 
    fetchRequests, 
    updateRequestState 
  } = useRequestStore();

  const [searchTerm, setSearchTerm] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedSolicitud, setSelectedSolicitud] = React.useState(null);
  const [openImageModal, setOpenImageModal] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState("");

  const { id } = useParams();

  useEffect(() => {
    const fetchAndSortRequests = async () => {
      await fetchRequests();
      const sortedRequests = [...requests].sort(
        (a, b) => new Date(b.start_date) - new Date(a.start_date)
      );
    };
    fetchAndSortRequests();
  }, [fetchRequests]);

  const pendientes = requests.filter(
    (solicitud) => solicitud.state.toLowerCase() === "pendiente"
  );

  const filteredSolicitudes = requests.filter((solicitud) => {
    const empleado = solicitud.user_name?.toLowerCase() || "";
    const tipo = solicitud.type?.toLowerCase() || "";
    const estado = solicitud.state?.toLowerCase() || "";

    return (
      empleado.includes(searchTerm) ||
      tipo.includes(searchTerm) ||
      estado.includes(searchTerm)
    );
  });

  const totalRows = filteredSolicitudes.length;
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredSolicitudes.slice(
    indexOfFirstRow,
    indexOfLastRow
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1);
  };

  const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedSolicitud(null);
    navigate("/requests");
  };

  const handleAccept = (_id) => {
    updateRequestState(_id, "Aceptada");
    handleCloseModal();
  };

  const handleReject = (_id) => {
    updateRequestState(_id, "Rechazada");
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
      <td>
        {new Intl.DateTimeFormat("es-CO", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          timeZone: "UTC",
        })
          .format(new Date(solicitud.create_date))
          .replaceAll("/", "-")}
      </td>
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
      <div className="modalRequest-content">
        <div className="mrc-header">
          <h4>Detalles de la solicitud</h4>
        </div>
        <div className="detail-item">
          <div className="detail-item-title">Empleado</div>
          <div className="detail-item-content">{solicitud.user_name}</div>
        </div>
        <div className="detail-item">
          <div className="detail-item-title">Inicia</div>
          <div className="detail-item-content">
            {new Intl.DateTimeFormat("es-CO", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              timeZone: "UTC",
            })
              .format(new Date(solicitud.start_date))
              .replaceAll("/", "-")}
          </div>
        </div>
        <div className="detail-item">
          <div className="detail-item-title">Finaliza</div>
          <div className="detail-item-content">
            {new Intl.DateTimeFormat("es-CO", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              timeZone: "UTC",
            })
              .format(new Date(solicitud.end_date))
              .replaceAll("/", "-")}
          </div>
        </div>
        <div className="detail-item">
          <div className="detail-item-title">Tipo</div>
          <div className="detail-item-content">{solicitud.type}</div>
        </div>
        <div className="detail-item">
          <div className="detail-item-title">Estado</div>
          <div className="detail-item-content">
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
          </div>
        </div>
        <div className="detail-item">
          <div className="detail-item-title">Descripción</div>
          <div className="detail-item-content">{solicitud.description}</div>
        </div>
        {solicitud.attach && (
          <div className="detail-item-attach">
            <div className="detail-item-title-attach">Justificante</div>
            <div className="detail-item-content-attach">
              <img
                src={solicitud.attach}
                alt="Solicitud"
                className="image-attach"
                onClick={() => {
                  setSelectedImage(solicitud.attach);
                  setOpenImageModal(true);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );

  const user = JSON.parse(localStorage.getItem("user"));

  if (isLoading) {
    return (
      <div className="loading-container">
        <Spin size="large" tip="Cargando solicitudes..." />
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
    <div className="requestsScreen">
      <Header title={"Solicitudes"} user={user} />
      <div className="searchBar-container">
        <div className="pendientes">
          <label>
            {`Tienes ${pendientes.length} solicitudes pendientes por revisar`}{" "}
          </label>
        </div>
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
          rowsPerPage={rowsPerPage}
          totalRows={totalRows}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
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