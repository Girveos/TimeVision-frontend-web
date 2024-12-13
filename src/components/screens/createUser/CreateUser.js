import React from "react";
import "./CreateUser.css";
import Header from "../../organisms/header/Header";
import { useNavigate } from "react-router-dom";
import {
  LeftOutlined,
  ExclamationCircleOutlined,
  DownOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import PasswordOutlinedIcon from "@mui/icons-material/PasswordOutlined";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, message } from "antd";
import { Dropdown } from "antd";
import { userFormSchema } from "../../../schemas/userFormSchema";
import { createUser } from "../../../config/routes";

const CreateUser = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/employees");
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(userFormSchema) });

  const items = [
    {
      key: "1",
      label: "Cédula de ciudadania",
    },
    {
      key: "2",
      label: "Cédula de extranjería",
    },
    {
      key: "3",
      label: "Pasaporte",
    },
  ];

  const handleTypeDocChange = (key, onChange) => {
    const selectedItem = items.find((item) => item.key === key);
    onChange(selectedItem?.label || "");
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await createUser(
        data.name,
        data.lastname,
        data.type_doc,
        data.num_doc,
        data.telephone,
        data.email,
        data.password,
        data.position
      );

      if (response.success) {
        reset();
        message.success("Nuevo usuario creado con éxito.");
        navigate("/employees");
      } else {
        message.error("Error al crear el usuario.");
      }
    } catch (error) {
      message.error(
        "Ocurrió un error inesperado. Por favor, intenta nuevamente."
      );
    }
  });

  return (
    <div className="createUserScreen">
      <Header title={"Nuevo usuario"} user={user} />
      <div className="body-createUser">
        <div className="create-back-btn-div">
          <Button className="back-btn" onClick={handleNavigate}>
            <LeftOutlined /> Volver a empleados
          </Button>
        </div>
        <div className="create-employee-form">
          <div className="form">
            <div className="div-label-modal">
              <label>Nombre</label>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    type={"text"}
                    value={value}
                    onChange={onChange}
                    name="name"
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
              <label>Apellido(s)</label>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    type={"text"}
                    value={value}
                    onChange={onChange}
                    name="lastname"
                    prefix={<ModeEditOutlineOutlinedIcon />}
                  />
                )}
                name="lastname"
              />
              {errors.lastname && (
                <div className="errors-div">
                  <ExclamationCircleOutlined />
                  <label className="errors-label">
                    {errors.lastname.message}
                  </label>
                </div>
              )}
            </div>

            <div className="div-label-modal">
              <label>Tipo de documento</label>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Dropdown
                    menu={{
                      items,
                      onClick: (e) => handleTypeDocChange(e.key, onChange),
                    }}
                  >
                    <Button className="dropdown-btn" name="type_doc">
                      {value || "Seleccionar tipo de documento"} <DownOutlined />
                    </Button>
                  </Dropdown>
                )}
                name="type_doc"
              />
              {errors.type_doc && (
                <div className="errors-div">
                  <ExclamationCircleOutlined />
                  <label className="errors-label">
                    {errors.type_doc.message}
                  </label>
                </div>
              )}
            </div>
            <div className="div-label-modal">
              <label>Número de documento</label>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    type={"text"}
                    value={value}
                    onChange={onChange}
                    name="num_doc"
                    prefix={<ModeEditOutlineOutlinedIcon />}
                  />
                )}
                name="num_doc"
              />
              {errors.num_doc && (
                <div className="errors-div">
                  <ExclamationCircleOutlined />
                  <label className="errors-label">
                    {errors.num_doc.message}
                  </label>
                </div>
              )}
            </div>
            <div className="div-label-modal">
              <label>Celular</label>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    type={"text"}
                    value={value}
                    onChange={onChange}
                    name="telephone"
                    prefix={<ModeEditOutlineOutlinedIcon />}
                  />
                )}
                name="telephone"
              />
              {errors.telephone && (
                <div className="errors-div">
                  <ExclamationCircleOutlined />
                  <label className="errors-label">
                    {errors.telephone.message}
                  </label>
                </div>
              )}
            </div>
          </div>
          <div className="form">
            <div className="div-label-modal">
              <label>Correo electrónico</label>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    type={"text"}
                    value={value}
                    onChange={onChange}
                    name="email"
                    autoComplete="off"
                    prefix={<EmailOutlinedIcon />}
                  />
                )}
                name="email"
              />
              {errors.email && (
                <div className="errors-div">
                  <ExclamationCircleOutlined />
                  <label className="errors-label">
                    {errors.email.message}
                  </label>
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
                    name="password"
                    autoComplete="new-password"
                    prefix={<PasswordOutlinedIcon />}
                  />
                )}
                name="password"
              />
              {errors.password && (
                <div className="errors-div">
                  <ExclamationCircleOutlined />
                  <label className="errors-label">
                    {errors.password.message}
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
                    value={user.department}
                    onChange={onChange}
                    name="department"
                    disabled={true}
                    prefix={<ApartmentOutlinedIcon />}
                  />
                )}
                name="department"
              />
              {errors.department && (
                <div className="errors-div">
                  <ExclamationCircleOutlined />
                  <label className="errors-label">
                    {errors.department.message}
                  </label>
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
                    name="position"
                    prefix={<ModeEditOutlineOutlinedIcon />}
                  />
                )}
                name="position"
              />
              {errors.position && (
                <div className="errors-div">
                  <ExclamationCircleOutlined />
                  <label className="errors-label">
                    {errors.position.message}
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="create-btn-div">
          <Button className="create-btn" onClick={handleSubmit(onSubmit)}>
            <UserAddOutlined /> Crear usuario
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
