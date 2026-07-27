
import React, {
  useState,
  useEffect
} from "react";

import {
  useNavigate,
  Link
} from "react-router-dom";

export default function SideMaue() {

  const navigate =
    useNavigate();

  const [username, setUsername] =
    useState("");

  // Check login user from localStorage
  useEffect(() => {

    const user =
      JSON.parse(
        localStorage.getItem(
          "user"
        )
      );

    if (!user) {
      navigate("/login");
    } else {
      setUsername(
        user.username
      );
    }

  }, [navigate]);

  // Logout function
  const Logout = () => {

    localStorage.removeItem(
      "user"
    );

    navigate("/login");
  };

  return (
    <div className="app-container">

      <div className="sidebar">

        <div className="logo">
          Slive Health
        </div>

        <div className="panel-title">
          PATIENT PANEL
        </div>

        <p
          style={{
            color: "white",
            textAlign: "center",
            marginTop: "10px"
          }}
        >
          Welcome {username}
        </p>

        <ul className="menu">

          <li>
            <Link
              to="/Patient"
              style={{
                textDecoration:
                  "none",
                color: "white"
              }}
            >
              Dashboard
            </Link>
          </li>

          <li>
            <Link
              to="/Appointment"
              style={{
                textDecoration:
                  "none",
                color: "white"
              }}
            >
              My Appointments
            </Link>
          </li>

          <li>
            <Link
              to="/dashboard"
              style={{
                textDecoration:
                  "none",
                color: "white"
              }}
            >
              Predictions
            </Link>
          </li>

          <li>
            <Link
              to="/Appointment"
              style={{
                textDecoration:
                  "none",
                color: "white"
              }}
            >
              Reports
            </Link>
          </li>
          <li
            onClick={Logout}
            style={{
              cursor: "pointer",
              color: "white"
            }}
          >
            Logout
          </li>

        </ul>
      </div>
    </div>
  );
}


