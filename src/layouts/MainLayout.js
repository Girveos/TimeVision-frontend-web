import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import "./MainLayout.css";
import SiderbarMenu from "../components/organisms/siderbarMenu/SiderbarMenu";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";

const MainLayout = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="main-layout">
      <button className="menu-toggle" onClick={toggleSidebar}>
        {isSidebarVisible ? <CloseOutlined /> : <MenuOutlined />}
      </button>
      <div className={`sidebar-container ${isSidebarVisible ? "visible" : ""}`}>
        <SiderbarMenu />
      </div>
      <div className={`content ${isSidebarVisible ? "blurred" : ""}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
