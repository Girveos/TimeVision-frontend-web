import React from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";


function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

export default App;
