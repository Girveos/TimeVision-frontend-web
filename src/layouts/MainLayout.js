import React from "react";
import { Outlet } from "react-router-dom";
import "./MainLayout.css";
import SiderbarMenu from "../components/organisms/siderbarMenu/SiderbarMenu";

const MainLayout = () => {
  return (
    <div className="main-layout">
      <div className="siderbar-container">
        <SiderbarMenu />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
