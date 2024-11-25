import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Login from "./components/screens/login/Login";
import { jwtDecode } from "jwt-decode";
import Home from "./components/screens/home/Home";
import Shifts from "./components/screens/shifts/Shifts";
import Request from "./components/screens/requests/Request";
import CalendarScreen from "./components/screens/calendar/CalendarScreen";
import Licenses from "./components/screens/licenses/Licenses";
import Employees from "./components/screens/employees/Employees";
import Settings from "./components/screens/settings/Settings";
import Profile from "./components/screens/profile/Profile";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.ep > currentTime) {
          setIsAuthenticated(true);
        } else {
          alert("La sesión ha expirado.");
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Token inválido:", error);
        localStorage.removeItem("token");
      }
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        {isAuthenticated ? (
          <Route path="/" element={<MainLayout />}>
            <Route path="home" element={<Home />} />
            <Route path="shifts" element={<Shifts />} />
            <Route path="requests" element={<Request />} />
            <Route path="calendar" element={<CalendarScreen />} />
            <Route path="licenses" element={<Licenses />} />
            <Route path="employees" element={<Employees />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        ) : (
          <Route path="login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
