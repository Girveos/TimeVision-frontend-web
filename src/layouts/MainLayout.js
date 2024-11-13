import React from "react";
import { Routes, Route } from "react-router-dom";
import "./MainLayout.css";
import SiderbarMenu from "../components/organisms/siderbarMenu/SiderbarMenu";
import Home from "../components/screens/home/Home";
import Shift from "../components/screens/shifts/Shift";
import Request from "../components/screens/requests/Request";
import Calendar from "../components/screens/calendar/Calendar";
import Licenses from "../components/screens/licenses/Licenses";
import Employees from "../components/screens/employees/Employees";
import Settings from "../components/screens/settings/Settings";

const MainLayout = () => {
  return (
    <div className="main-layout">
      <div className="siderbar-container">
        <SiderbarMenu />
      </div>
      <div className="content">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/shifts" element={<Shift />} />
          <Route path="/requests" element={<Request />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/licenses" element={<Licenses />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
};

export default MainLayout;
