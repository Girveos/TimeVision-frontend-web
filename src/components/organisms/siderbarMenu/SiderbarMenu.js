import React from "react";
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
            <a href="/home"> <LineChartOutlined /> Panel principal</a>
          </li>
          <li>
            <a href="/about"><ScheduleOutlined /> Turnos</a>
          </li>
          <li>
            <a href="/services"><MessageOutlined /> Solicitudes</a>
          </li>
          <li>
            <a href="/contact"><CalendarOutlined /> Calendario</a>
          </li>
          <li>
            <a href="/home"><SolutionOutlined /> Licencias</a>
          </li>
          <li>
            <a href="/about"><TeamOutlined /> Personal</a>
          </li>
          <li>
            <a href="/services"><SettingOutlined /> Configuración</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SiderbarMenu;
