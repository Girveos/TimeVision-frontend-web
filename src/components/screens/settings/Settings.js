import React from "react";
import "./Settings.css";
import Header from "../../organisms/header/Header";

const Settings = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="settingsScreen">
      <Header title={"Configuración"} user={user} />
      <div className="body-settings"></div>
    </div>
  );
};

export default Settings;
