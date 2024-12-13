import React from "react";
import "./userProfile.css";

const UserProfile = ({ name, lastname, photo }) => {
  const getInitials = (name) => {
    if (!name) return "";
    const nameParts = name.split(" ");
    return nameParts.map((part) => part[0].toUpperCase()).join("");
  };

  return (
    <div className="user-profile">
      <div className="profile-img">
        {photo ? (
          <img src={photo} alt="Profile-image" className="img-photo"></img>
        ) : (
          <div className="initials-userprofile">
            {getInitials(`${name} ${lastname}`)}
          </div>
        )}
      </div>
      <div className="user-info">
        <p className="user-name">
          {name} {lastname}
        </p>
        <p className="user-role">Administrador</p>
      </div>
    </div>
  );
};

export default UserProfile;
