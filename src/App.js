import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Login from "./components/screens/login/Login";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      {isAuthenticated ? <MainLayout /> : <Login onLoginSuccess={handleLoginSuccess} />}
    </Router>
  );
}

export default App;
