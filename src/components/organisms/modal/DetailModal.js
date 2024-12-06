// components/Modals/index.jsx
import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import "./DetailModal.css";
import { Button, Input } from "antd";
import { CloudUploadOutlined, LeftOutlined, ExclamationCircleOutlined, EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import PasswordOutlinedIcon from "@mui/icons-material/PasswordOutlined";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import PictureInPictureOutlinedIcon from "@mui/icons-material/PictureInPictureOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import img from "../../../assets/img.jpg";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../../schemas/loginSchema";


export const EmployeeEditModal = ({ open, onClose, data }) => {
  const getInitials = (name) => {
    if (!name) return "";
    const nameParts = name.split(" ");
    return nameParts.map((part) => part[0].toUpperCase()).join("");
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="modal-box-employee-info">
        <div className="create-employee-form">
          <div className="modal-back-btn-div">
            {" "}
            <Button className="back-btn" onClick={onClose}>
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
            <label>Correo electrónico</label>
            <Input
              type="text"
              value={data?.email}
              prefix={<EmailOutlinedIcon />}
            />
          </div>
          <div className="div-label-modal">
            <label>Departamento</label>
            <Input
              type="text"
              value={data?.department_name}
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
        </div>
        <div className="create-employee-img">
          <label>Usuario</label>
          <div className="create-user-img">
            <img src={data?.photo} alt="Foto Perfil" />
          </div>
          <Button className="upload-photo-btn">
            {" "}
            <CloudUploadOutlined /> Subir foto
          </Button>
          <Button className="save-btn save-user-info">Guardar</Button>
        </div>
      </Box>
    </Modal>
  );
};

export const CreateEmployeeModal = ({ open, onClose }) => {
  /* const [showPassword, setShowPassword] = useState(false); */

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="modal-box-employee-info">
        <div className="create-employee-form">
          <div className="modal-back-btn-div">
            {" "}
            <Button className="back-btn" onClick={onClose}>
              <LeftOutlined />
            </Button>
          </div>
          <div className="div-label-modal">
            <label>Nombre</label>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  type={"text"}
                  value={value}
                  onChange={onChange}
                  prefix={<ModeEditOutlineOutlinedIcon />}
                />
              )}
              name="name"
            />
            {errors.name && (
              <div className="errors-div">
                <ExclamationCircleOutlined />
                <label className="errors-label">{errors.name.message}</label>
              </div>
            )}
          </div>
          <div className="div-label-modal">
            <label>Apellidos</label>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  type={"text"}
                  value={value}
                  onChange={onChange}
                  prefix={<ModeEditOutlineOutlinedIcon />}
                />
              )}
              name="lastname"
            />
            {errors.lastname && (
              <div className="errors-div">
                <ExclamationCircleOutlined />
                <label className="errors-label">{errors.lastname.message}</label>
              </div>
            )}
          </div>
          <div className="div-label-modal">
            <label>Correo electrónico</label>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  type={"text"}
                  value={value}
                  onChange={onChange}
                  prefix={<EmailOutlinedIcon />}
                />
              )}
              name="email"
            />
            {errors.email && (
              <div className="errors-div">
                <ExclamationCircleOutlined />
                <label className="errors-label">{errors.email.message}</label>
              </div>
            )}
          </div>
          <div className="div-label-modal">
            <label>Contraseña</label>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  type={"password"}
                  value={value}
                  onChange={onChange}
                  prefix={<PasswordOutlinedIcon />}
                  /* suffix={
                    showPassword ? (
                      <EyeOutlined onClick={() => setShowPassword(false)} />
                    ) : (
                      <EyeInvisibleOutlined
                        onClick={() => setShowPassword(true)}
                      />
                    )
                  } */
                />
              )}
              name="pass"
            />
            {errors.pass && (
              <div className="errors-div">
                <ExclamationCircleOutlined />
                <label className="errors-label">
                  {errors.pass.message}
                </label>
              </div>
            )}
          </div>
          <div className="div-label-modal">
            <label>Departamento</label>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  type={"text"}
                  value={value}
                  onChange={onChange}
                  prefix={<ApartmentOutlinedIcon />}
                />
              )}
              name="department"
            />
            {errors.department && (
              <div className="errors-div">
                <ExclamationCircleOutlined />
                <label className="errors-label">{errors.department.message}</label>
              </div>
            )}
          </div>
          <div className="div-label-modal">
            <label>Cargo</label>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  type={"text"}
                  value={value}
                  onChange={onChange}
                  prefix={<PictureInPictureOutlinedIcon />}
                />
              )}
              name="position"
            />
            {errors.position && (
              <div className="errors-div">
                <ExclamationCircleOutlined />
                <label className="errors-label">{errors.position.message}</label>
              </div>
            )}
          </div>
        </div>
        <div className="create-employee-img">
          <label>Usuario</label>
          <div className="create-user-img">
            <img src={img} alt="Foto Perfil" />
          </div>
          <Button className="upload-photo-btn">
            {" "}
            <CloudUploadOutlined /> Subir foto
          </Button>
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
