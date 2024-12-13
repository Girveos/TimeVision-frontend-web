import React, { useState } from "react";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import Header from "../../organisms/header/Header";
import ChangePasswordModal from "../../organisms/changePassword/ChangePasswordModal";
import { updatePhoto } from "../../../config/routes";
import { Button } from "antd";

const Profile = () => {
  const navigate = useNavigate();

  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const updateProfilePhoto = async (event) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const response = await updatePhoto(file);
  
        const user = JSON.parse(localStorage.getItem("user"));
        user.photo = response; 
        localStorage.setItem("user", JSON.stringify(user));
  
        console.log("Foto de perfil actualizada exitosamente");

      } catch (error) {
        console.error("Error al actualizar la foto de perfil:", error);
      }
    } else {
      console.error("No se seleccionó ningún archivo.");
    }
  };
  
  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const getInitials = (name) => {
    if (!name) return '';
    const nameParts = name.split(' ');
    return nameParts.map(part => part[0].toUpperCase()).join('');
  };

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="profileScreen">
      <Header title={"Perfil"} user={user} />
      <div className="body-profile">
        <div className="photo-container">
          <div className="photo-div">
          <label htmlFor="profile-photo-upload">
              {user.photo ? (
                <img
                  src={user.photo}
                  alt="Profile"
                  className="img-profile"
                />
              ) : (
                <div className="initials-profile">
                  {getInitials(`${user.name} ${user.lastname}`)}
                </div>
              )}
            </label>
            <input
              id="profile-photo-upload"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={updateProfilePhoto}
            />
          </div>
          <p>Bienvenido {user.name}</p>
        </div>
        <div className="userInfo-container">
          <div className="userInfo-div">
            <div className="subtitle">
              <p>Nombre completo</p>
              <div className="labeldiv">
                <label>
                  {user.name} {user.lastname}
                </label>
              </div>
            </div>
            <div className="subtitle">
              <p>Cargo</p>
              <div className="labeldiv">
                <label>{user.position}</label>
              </div>
            </div>
          </div>
          <div className="userInfo-div">
            <div className="subtitle">
              <p>Correo electrónico</p>
              <div className="labeldiv">
                <label>{user.email}</label>
              </div>
            </div>
            <div className="subtitle">
              <p>Departamento</p>
              <div className="labeldiv">
                <label>{user.department}</label>
              </div>
            </div>
            <div className="buttons-container">
              <Button onClick={handleOpenModal} className="changepassword-btn" name="changePasswordButton">
                Cambiar contraseña
              </Button>
              <Button onClick={handleLogout} className="logout-btn">
                Cerrar sesión
              </Button>
            </div>
            <ChangePasswordModal
              visible={modalVisible}
              onClose={handleCloseModal}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
