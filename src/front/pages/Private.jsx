import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Private = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login"); 
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("token"); 
    navigate("/");
  };

  return (
    <div className="container mt-5">
      <h1>Bienvenido a la zona privada</h1>
      <button onClick={handleLogout} className="btn btn-danger mt-3">
        Cerrar sesión
      </button>
    </div>
  );
};
