import React from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container text-center mt-5">
      <h1 className="mb-4">¡Bienvenido!</h1>

      <img
        src="https://i.pinimg.com/736x/d9/e1/0d/d9e10dba5d62a9e06dabc8761a28f6b4.jpg"
        alt="Welcome"
        className="img-fluid rounded mb-4"
        style={{ maxWidth: "400px", height: "auto" }}
      />

      <div className="d-flex justify-content-center gap-3">
        <button className="btn btn-primary" onClick={() => navigate("/registro")}>
          Registrarse
        </button>
        <button className="btn btn-secondary" onClick={() => navigate("/login")}>
          Iniciar Sesión
        </button>
      </div>
    </div>
  );
};
