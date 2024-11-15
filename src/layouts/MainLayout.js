import React from "react";
import { Routes, Route } from "react-router-dom";
import "./MainLayout.css";
import SiderbarMenu from "../components/organisms/siderbarMenu/SiderbarMenu";
import Home from "../components/screens/home/Home";
import Shifts from "../components/screens/shifts/Shifts";
import Request from "../components/screens/requests/Request";
import CalendarScreen from "../components/screens/calendar/CalendarScreen";
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
          <Route path="/shifts" element={<Shifts />} />
          <Route path="/requests" element={<Request />} />
          <Route path="/calendar" element={<CalendarScreen />} />
          <Route path="/licenses" element={<Licenses />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
};

export default MainLayout;
