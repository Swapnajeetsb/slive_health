import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import { Link, useNavigate }
from "react-router-dom";

import "./dashboard.css";

function AdminDashboard() {

  const navigate =
    useNavigate();

  const [stats, setStats] =
    useState(null);

  const [
    appointments,
    setAppointments,
  ] = useState([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard =
    async () => {
      try {

        const { data } =
          await axios.get(
            "https://slive-health.onrender.com/admin/dashboard"
          );

        console.log(data);

        setStats(
          data.stats
        );

        setAppointments(
          data.recentAppointments
        );

      } catch (error) {
        console.log(error);
      }
    };

  const logout = () => {

    localStorage.removeItem(
      "user"
    );

    navigate("/login");
  };

  return (
    <div className="admin-container">

      {/* Sidebar */}
      <div className="sidebar">

        <div className="logo">
          ❤️ Slive Health
        </div>

        <p className="panel-title">
          ADMIN PANEL
        </p>

        <ul className="menu">

          <li className="active">
            Dashboard
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
              to="/Appointment"
              className="menu-link"
            >
              Appointments
            </Link>
          </li>

          <li>
            Predictions
          </li>

          <li>
            Reports
          </li>

          <li
            onClick={logout}
            style={{
              cursor:
                "pointer",
            }}
          >
            Logout
          </li>

        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">

        {/* Header */}
        <div className="header">

          <div>
            <h2>
              Admin Dashboard
            </h2>

            <p>
              Welcome back,
              Admin!
            </p>
          </div>

          <div className="profile">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="admin"
            />

            <div>
              <h5>
                Admin
              </h5>

              <span>
                Super Admin
              </span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">

          <div className="card-box">
            <h4>
              Total Users
            </h4>

            <h2>
              {
                stats?.totalUsers || 0
              }
            </h2>
          </div>

          <div className="card-box">
            <h4>
              Total Doctors
            </h4>

            <h2>
              {
                stats?.totalDoctors || 0
              }
            </h2>
          </div>

          <div className="card-box">
            <h4>
              Total Appointments
            </h4>

            <h2>
              {
                stats?.totalAppointments || 0
              }
            </h2>
          </div>

          <div className="card-box">
            <h4>
              Total Predictions
            </h4>

            <h2>
              {
                stats?.totalPredictions || 0
              }
            </h2>
          </div>

        </div>

        {/* Action Cards */}
        <div className="action-grid">

          <Link
            to="/docter"
            className="action-card"
          >
            <h4>
              Add Doctor
            </h4>

            <p>
              Add new doctor
              to system
            </p>
          </Link>

          <Link
            to=""
            className="action-card"
          >
            <h4>
              Manage Doctors
            </h4>

            <p>
              View and manage
              doctors
            </p>
          </Link>

          <Link
            to="/manage-users"
            className="action-card"
          >
            <h4>
              Manage Users
            </h4>

            <p>
              View and manage
              users
            </p>
          </Link>

        </div>

        {/* Recent Appointment Table */}
        <div className="table-container">

          <h3>
            Recent Appointments
          </h3>

          <table>

            <thead>
              <tr>
                <th>
                  Patient
                </th>

                <th>
                  Doctor
                </th>

                <th>
                  Date
                </th>

                <th>
                  Time
                </th>

                <th>
                  Status
                </th>
              </tr>
            </thead>

            <tbody>

              {
                appointments
                ?.length > 0
                ? (
                  appointments.map(
                    (
                      item
                    ) => (
                      <tr
                        key={
                          item._id
                        }
                      >
                        <td>
                          {
                            item.patientName
                          }
                        </td>

                        <td>
                          {
                            item.doctor
                          }
                        </td>

                        <td>
                          {
                            item.date
                          }
                        </td>

                        <td>
                          {
                            item.time
                          }
                        </td>

                        <td>
                          <span
                            className={
                              item.status
                            }
                          >
                            {
                              item.status
                            }
                          </span>
                        </td>
                      </tr>
                    )
                  )
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                    >
                      No
                      Appointments
                    </td>
                  </tr>
                )
              }

            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;