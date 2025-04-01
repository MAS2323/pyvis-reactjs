import React from "react";
import { useNavigate } from "react-router-dom";
import CesiumViewer from "../components/CesiumViewer";

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Eliminar el estado de autenticación
    localStorage.removeItem("isLoggedIn");

    // Redirigir a la pantalla de bienvenida
    navigate("/welcome");
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
      <CesiumViewer />
    </div>
  );
};

export default HomePage;
