import React, { useState } from "react";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import Header from "../../organisms/header/Header";
import ChangePasswordModal from "../../organisms/changePassword/ChangePasswordModal";

const Profile = () => {
  const navigate = useNavigate();

  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const updateProfilePhoto = () => {
    console.log("CAMBIANDO FOTO");
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
          <div className="photo-div" onClick={updateProfilePhoto}>
            {user.photo ? (
              <img
                src={user.photo}
                alt="Profile-image"
                className="img-profile"
              ></img>
            ) : (
              <div
                className="initials-profile"
              >
                {getInitials(`${user.name} ${user.lastname}`)}
              </div>
            )}
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
              <button onClick={handleOpenModal} className="logout-button">
                Cambiar contraseña
              </button>
              <button onClick={handleLogout} className="logout-button">
                Cerrar sesión
              </button>
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
