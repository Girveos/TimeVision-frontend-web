// components/Modals/index.jsx
import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import "./DetailModal.css";
import { Button, Input, Switch } from "antd";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import PictureInPictureOutlinedIcon from "@mui/icons-material/PictureInPictureOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import { LeftOutlined } from "@ant-design/icons";

export const EmployeeEditModal = ({ open, onClose, data }) => {
  const getInitials = (name) => {
    if (!name) return "";
    const nameParts = name.split(" ");
    return nameParts.map((part) => part[0].toUpperCase()).join("");
  };

  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="modal-box-employee-info">
        <div className="edit-employee-form">
          <div className="edit-back-btn-div">
            {" "}
            <Button className="back-btn-edit" onClick={onClose}>
              <LeftOutlined />
            </Button>
          </div>
          <div className="div-label-modal">
            {console.log(data)}
            <label>Nombre</label>
            <Input
              type="text"
              value={data?.name}
              prefix={<ModeEditOutlineOutlinedIcon />}
            />
          </div>
          <div className="div-label-modal">
            <label>Apellidos</label>
            <Input
              type="text"
              value={data?.lastname}
              prefix={<ModeEditOutlineOutlinedIcon />}
            />
          </div>
          <div className="div-label-modal">
            <label>Tipo de documento</label>
            <Input
              type="text"
              value={data?.type_doc}
              disabled={true}
              prefix={<BadgeOutlinedIcon />}
            />
          </div>
          <div className="div-label-modal">
            <label>Documento</label>
            <Input
              type="text"
              value={data?.num_doc}
              disabled={true}
              prefix={<BadgeOutlinedIcon />}
            />
          </div>
          <div className="div-label-modal">
            <label>Celular</label>
            <Input
              type="text"
              value={data?.telephone}
              prefix={<LocalPhoneOutlinedIcon />}
            />
          </div>
          <div className="div-label-modal">
            <label>Correo electrónico</label>
            <Input
              type="text"
              value={data?.email}
              prefix={<EmailOutlinedIcon />}
            />
          </div>
        </div>
        <div className="edit-employee-form">
          <div className="edit-user-img">
            {data?.photo ? (
              <img
                src={data?.photo}
                alt={data?.name}
                className="employee-photo"
              />
            ) : (
              <div className="initials-employees">
                {getInitials(`${data?.name} ${data?.lastname}`)}
              </div>
            )}
          </div>
          <div className="div-label-modal">
            <label>Departamento</label>
            <Input
              type="text"
              value={data?.department_name}
              disabled={true}
              prefix={<ApartmentOutlinedIcon />}
            />
          </div>
          <div className="div-label-modal">
            <label>Cargo</label>
            <Input
              type="text"
              value={data?.position}
              prefix={<PictureInPictureOutlinedIcon />}
            />
          </div>
          <div className="div-label-modal-active">
            <label>Activo</label>
            <Switch defaultChecked onChange={onChange} />
          </div>

          <Button className="save-btn save-user-info">Guardar</Button>

        </div>
      </Box>
    </Modal>
  );
};

export const Modaldetail = ({
  open,
  onClose,
  data,
  onAccept,
  onReject,
  showActions = true,
  renderContent,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box className="modal-box-request">
        {data && renderContent(data)}
        {data && showActions && (
          <div className="modal-buttons">
            <Button className="accept-btn" onClick={() => onAccept(data._id)}>
              Aceptar
            </Button>
            <Button className="reject-btn" onClick={() => onReject(data._id)}>
              Rechazar
            </Button>
          </div>
        )}
      </Box>
    </Modal>
  );
};

export const ImageModal = ({ open, onClose, imageUrl }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box className="modal-image-box">
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Imagen Ampliada"
            className="full-size-image"
            onClick={onClose}
          />
        )}
      </Box>
    </Modal>
  );
};
