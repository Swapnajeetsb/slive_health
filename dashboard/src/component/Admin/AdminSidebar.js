import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./dashboard.css";

function AdminSidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("admin");

    navigate("/admin-login");
  };

  return (
    <div className="sidebar">

      <div className="logo">
        ❤️ Slive Health
      </div>

      <p className="panel-title">
        ADMIN PANEL
      </p>

      <ul className="menu">

        <li>
          <Link
            to="/AdminDashboard"
            className="menu-link"
          >
            Dashboard
          </Link>
        </li>

        <li>
          <Link
            to="/manage-users"
            className="menu-link"
          >
            Users
          </Link>
        </li>

        <li>
          <Link
            to="/manage-doctors"
            className="menu-link"
          >
            Doctors
          </Link>
        </li>

        <li>
          <Link
            to="/manage-appointments"
            className="menu-link"
          >
            Appointments
          </Link>
        </li>

        <li>
          <Link
            to="/manage-predictions"
            className="menu-link"
          >
            Predictions
          </Link>
        </li>

        <li>
          <Link
            to="/reports"
            className="menu-link"
          >
            Reports
          </Link>
        </li>

        <li
          onClick={logout}
          style={{
            cursor: "pointer",
            color: "white",
          }}
        >
          Logout
        </li>

      </ul>
    </div>
  );
}

export default AdminSidebar;