import React from "react";
import { Route, Routes } from "react-router-dom";
// import reportWebVitals from './reportWebVitals';
// import Dashboard from "./Admin/Dashboard";
// import DoctorForm from "./Admin/Docter";
import BookAppointment from "./Appoinment";
import PatientDashboard from "./UserDashbord";
// import DoctorLogin from "./Docter/Authentication/DoctorLogin";
// import DoctorDashboard from "./Docter/DocterDashboard";
import Login from "./Auth/login";
import Signup from "./Auth/Signup";
import Home from "./Auth/Home";
import Hero from "./Hero";
import SideMaue from "./SideBar";

const Dashboardroute = () => {
  return (
    <div className="dashboard-container">
      <div className="content">
        <Routes>
        
          <Route path="/Appointment" element={<BookAppointment />} />
          <Route path="/Patient" element={<PatientDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Hero />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboardroute;
