import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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
  const [checkingAuth, setCheckingAuth] = useState(true);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  useEffect(() => {
    const validateToken = () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const payload = jwtDecode(token);
          const currentTime = new Date().getTime();

          const { ep } = payload;

          console.log("ep:", ep);
          console.log("currentTime:", currentTime);

          if (ep <= currentTime) {
            alert("La sesión ha expirado.");
            localStorage.removeItem("token");
            setIsAuthenticated(false);
          } else {
            setIsAuthenticated(true);
          }
        } catch (error) {
          console.error("Token inválido:", error);
          localStorage.removeItem("token");
          setIsAuthenticated(false);
        }
      }
      setCheckingAuth(false); 
    };

    validateToken();
  }, []);

  if (checkingAuth) {
    return <div>Cargando...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route
          path="login"
          element={<Login onLoginSuccess={handleLoginSuccess} />}
        />
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
          <Route path="/" element={<Navigate to="/login" />} />
        )}

        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/home" : "/login"} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
