import React from "react";
import { useNavigate } from "react-router-dom";

function RoleSelection() {
  const navigate = useNavigate();

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="card p-5 shadow-lg text-center">

        <h2 className="mb-4">
          Select Login Type
        </h2>

        <button
          className="btn btn-primary mb-3"
          onClick={() => navigate("/login")}
        >
          User Login
        </button>

        <button
          className="btn btn-success mb-3"
          onClick={() => navigate("/DocterLogin")}
        >
          Doctor Login
        </button>

        <button
          className="btn btn-danger"
          onClick={() => navigate("/admin-login")}
        >
          Admin Login
        </button>

      </div>
    </div>
  );
}

export default RoleSelection;