import React from "react";
import { Route, Routes } from "react-router-dom";
// import reportWebVitals from './reportWebVitals';
import Dashboard from "./Admin/Dashboard";
import DoctorForm from "./Admin/Docter";
import BookAppointment from "./user/Appoinment";
import PatientDashboard from "./user/UserDashbord";
import DoctorLogin from "./Docter/Authentication/DoctorLogin";
import DoctorDashboard from "./Docter/DocterDashboard";
import Login from "./user/Auth/login";
import Signup from "./user/Auth/Signup";
import Home from "./user/Auth/Home";
import Hero from "./user/Hero";
import HomePage from "./user/HomePage";
import ManageUsers from "./Admin/ManageUsers";
import ManageDoctors from "./Admin/ManageDoctors";
import ManageAppointments from "./Admin/ManageAppointments";
import ManagePredictions from "./Admin/ManagePredictions";
import AdminLogin from "./Admin/AdminLogin";
import RoleSelection from "./Admin/RoleSelection";

import { CookiesProvider } from "react-cookie";

const Dashboardroute = () => {
  return (
    <div className="dashboard-container">
      <div className="content">
        <Routes>
          <Route exact path="/AdminDashboard" element={<Dashboard />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/docter" element={<DoctorForm />} />
          <Route
  path="/select-role"
  element={<RoleSelection />}
/>
          <Route path="/*" element={<HomePage />} />
          <Route path="/manage-users" element={<ManageUsers />} />

          <Route path="/manage-doctors" element={<ManageDoctors />} />

          <Route path="/manage-appointments" element={<ManageAppointments />} />

          <Route path="/manage-predictions" element={<ManagePredictions />} />

          <Route path="/DocterLogin" element={<DoctorLogin />} />
          <Route path="/DocterDashboard" element={<DoctorDashboard />} />
          <Route path="/login" element={<Login />} />

          <Route path="/signup" element={<Signup />} />

          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboardroute;
