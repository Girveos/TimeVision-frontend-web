import React from "react";
import "./MainLayout.css";
import SiderbarMenu from "../components/organisms/siderbarMenu/SiderbarMenu";

const MainLayout = () => {
  return (
    <div className="main-layout">
        <div className="siderbar-content">
        <SiderbarMenu />
        </div>
      
      <div className="content">Content hola</div>
    </div>
  );
};

export default MainLayout;
