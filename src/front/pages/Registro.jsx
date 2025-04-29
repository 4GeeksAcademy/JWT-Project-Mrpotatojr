import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const Registro = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState(""); // <- Cambiado a userName
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const createUser = async (e) => {
    e.preventDefault();
  
    // Validación de campos
    if (!userName || !email || !password) {
      alert("Todos los campos son obligatorios.");
      return;
    }
  
    // Realizar la solicitud POST al backend
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/registro`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_name: userName, 
        email,
        password,
      }),
    });
  
    if (response.ok) {
      alert("Usuario creado con éxito");
      navigate("/login"); 
    } else {
      const errorData = await response.json();
      alert(errorData.msg || "Error al crear el usuario");
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="w-50">
        <h2 className="text-center mb-4">Registro</h2>
        <form onSubmit={createUser}>
          <div className="mb-3">
            <label htmlFor="userName" className="form-label">Nombre de usuario</label> {/* <- Cambiado label */}
            <input
              type="text"
              className="form-control"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)} 
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Registrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
