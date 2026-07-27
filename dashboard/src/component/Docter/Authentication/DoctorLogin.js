import React, { useState } from "react";
import axios from "axios";
import { Link,useNavigate} from "react-router-dom";



function DoctorLogin() {
  const navigate = useNavigate();
  const [doctorData, setDoctorData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setDoctorData({
      ...doctorData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/Doctor/login",
        doctorData
      );

alert(response.data.message);

if (response.data.success) {
    localStorage.setItem(
    "doctor",
    JSON.stringify(response.data.user)
  );
  navigate("/DocterDashboard");
}
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Login Failed"
      );
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div
        className="card shadow p-4"
        style={{ width: "400px" }}
      >
        <h2 className="text-center mb-4">
          Doctor Login
        </h2>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label className="form-label">
              Email
            </label>

            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Enter Email"
              value={doctorData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Password
            </label>

            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Enter Password"
              value={doctorData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            Login
          </button>

        </form>
      </div>
    </div>
  );
}

export default DoctorLogin;