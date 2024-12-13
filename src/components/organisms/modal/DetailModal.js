import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import "./DetailModal.css";
import { Button, Input, message, Switch } from "antd";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import PictureInPictureOutlinedIcon from "@mui/icons-material/PictureInPictureOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import { LeftOutlined } from "@ant-design/icons";
import { updateUser } from "../../../config/routes";

export const EmployeeEditModal = ({ open, onClose, data }) => {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    telephone: "",
    position: "",
    active: false,
  });

  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name || "",
        lastname: data.lastname || "",
        email: data.email || "",
        telephone: data.telephone || "",
        position: data.position || "",
        active: data.active || false,
      });
      setIsModified(false);
    }
  }, [data]);

  const handleChange = (field, value) => {
    setFormData((prevState) => {
      const updatedFormData = {
        ...prevState,
        [field]: value,
      };
      
      setIsModified(
        Object.keys(updatedFormData).some(
          (key) => updatedFormData[key] !== (data[key] || "")
        )
      );
      return updatedFormData;
    });
  };

  const validateForm = () => {
    const errors = [];
  
    if (!formData.name.trim()) errors.push("El campo nombre no puede estar vacío.");
    if (formData.name.length > 50) errors.push("El campo no puede tener más de 50 caracteres.");
    
    if (!formData.lastname.trim()) errors.push("El campo apellido no puede estar vacío.");
    if (formData.lastname.length > 50) errors.push("El campo no puede tener más de 50 caracteres.");
    
    if (!formData.email.trim()) {
      errors.push("El correo electrónico no puede estar vacío.");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.push("El correo electrónico no es válido.");
    }
    
    if (!formData.telephone.trim()) errors.push("El celular no puede estar vacío.");
    if (formData.telephone && formData.telephone.length > 15) {
      errors.push("El campo teléfono no puede tener más de 15 caracteres.");
    }
  
    if (formData.position.length > 50) {
      errors.push("El campo no puede tener más de 50 caracteres.");
    }
  
    return errors;
  };
  
  const onSubmit = async () => {
    const errors = validateForm();
  
    if (errors.length > 0) {
      message.error(errors.join(" "));
      setFormData({
        name: data.name || "",
        lastname: data.lastname || "",
        email: data.email || "",
        telephone: data.telephone || "",
        position: data.position || "",
        active: data.active || false,
      });
      return;
    }
  
    try {
      const response = await updateUser(data._id, formData);
  
      if (response.success) {
        message.success("Usuario actualizado con éxito.");
        setIsModified(false);
      } else {
        message.error("Error al actualizar el usuario.");
      }
    } catch (error) {
      message.error("Ocurrió un error inesperado. Por favor, intenta nuevamente.");
    }
  };

  const getInitials = (name) => {
    if (!name) return "";
    const nameParts = name.split(" ");
    return nameParts.map((part) => part[0].toUpperCase()).join("");
  };

  const onChange = (checked) => {
    handleChange("active", checked);
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
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              prefix={<ModeEditOutlineOutlinedIcon />}
            />
          </div>
          <div className="div-label-modal">
            <label>Apellidos</label>
            <Input
              type="text"
              value={formData.lastname}
              onChange={(e) => handleChange("lastname", e.target.value)}
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
              value={formData.telephone}
              onChange={(e) => handleChange("telephone", e.target.value)}
              prefix={<LocalPhoneOutlinedIcon />}
            />
          </div>
          <div className="div-label-modal">
            <label>Correo electrónico</label>
            <Input
              type="text"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
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
              value={formData.position}
              onChange={(e) => handleChange("position", e.target.value)}
              prefix={<PictureInPictureOutlinedIcon />}
            />
          </div>
          <div className="div-label-modal-active">
            <label>Activo</label>
            <Switch
              checked={formData.active}
              onChange={onChange}
            />
          </div>

          <Button
            className="save-btn save-user-info"
            onClick={onSubmit}
            disabled={!isModified}
          >
            Guardar
          </Button>
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
