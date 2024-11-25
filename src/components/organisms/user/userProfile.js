import React from "react";
import "./userProfile.css";

const UserProfile = ({ name, lastname, photo }) => {
  return (
    <div className="user-profile">
      <div className="profile-img">
        <img src={photo} alt="ProfileImage" className="img-photo"></img>
      </div>
      <div className="user-info">
        <p className="user-name">{name} {lastname}</p>
        <p className="user-role">Administrador</p>
      </div>
    </div>
  );
};

export default UserProfile;
