import React from "react";
import { NavLink } from "react-router-dom";
import "./SiderbarMenu.css";
import Logo from '../../../assets/LogoGrey.png';
import { CalendarOutlined, LineChartOutlined, MessageOutlined, ScheduleOutlined, SettingOutlined, SolutionOutlined, TeamOutlined } from "@ant-design/icons";

export const SiderbarMenu = () => {
  return (
    <div className="sidebar-menu">
      <div className="sidebar-title">
        <img src={Logo} alt="Logo" className="TimeVision Logo" />
        <h3>TimeVision</h3>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <NavLink to="/home" className={({ isActive }) => isActive ? "active-link" : ""}>
              <LineChartOutlined /> Panel principal
            </NavLink>
          </li>
          <li>
            <NavLink to="/shifts" className={({ isActive }) => isActive ? "active-link" : ""}>
              <ScheduleOutlined /> Turnos
            </NavLink>
          </li>
          <li>
            <NavLink to="/requests" className={({ isActive }) => isActive ? "active-link" : ""}>
              <MessageOutlined /> Solicitudes
            </NavLink>
          </li>
          <li>
            <NavLink to="/calendar" className={({ isActive }) => isActive ? "active-link" : ""}>
              <CalendarOutlined /> Calendario
            </NavLink>
          </li>
          <li>
            <NavLink to="/licenses" className={({ isActive }) => isActive ? "active-link" : ""}>
              <SolutionOutlined /> Licencias
            </NavLink>
          </li>
          <li>
            <NavLink to="/employees" className={({ isActive }) => isActive ? "active-link" : ""}>
              <TeamOutlined /> Personal
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings" className={({ isActive }) => isActive ? "active-link" : ""}>
              <SettingOutlined /> Configuración
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SiderbarMenu;
