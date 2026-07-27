import React from "react";
import { NavLink } from "react-router-dom";
import "./DoctorSidebar.css";
import { useNavigate } from "react-router-dom";



const DoctorSidebar = () => {
  const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem("doctor");

  navigate("/");
};
  return (
    <div className="sidebar">

      <h2 className="logo">
        🩺 Doctor Panel
      </h2>

      <NavLink to="/DoctorDashboard">
        Dashboard
      </NavLink>

      <NavLink to="/appointments">
        Appointments
      </NavLink>

      <NavLink to="/patients">
        Patients
      </NavLink>

      <NavLink to="/predictions">
        Predictions
      </NavLink>

      <button className="btn btn-danger" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default DoctorSidebar;