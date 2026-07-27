
import React, { useEffect, useState } from "react";
import axios from "axios";
import SideMaue from "./SideBar";
import "./userAp.css";

export default function BookAppointment() {
  const [doctors, setDoctors] = useState([]);

  const [formData, setFormData] = useState({
    patientName: "",
    email: "",
    mobile: "",
    doctor: "",
    date: "",
    time: "",
    symptoms: "",
  });

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3001/allDoctors"
      );

      setDoctors(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3001/BookAppointment",
        formData
      );

      console.log(res.data);

      alert(
        "Appointment booked successfully."
      );

      setFormData({
        patientName: "",
        email: "",
        mobile: "",
        doctor: "",
        date: "",
        time: "",
        symptoms: "",
      });

    } catch (error) {
  console.log(error);

  console.log(error.response);

  console.log(error.response?.data);

  alert(
    error.response?.data?.message ||
    "Something went wrong"
  );
    }
  };

  return (
    <div className="app-container row">
      <div className="col-3">
         <SideMaue />

      </div>
    

  <div className="container-fluid py-4 col-9">
    <div className="card shadow border-0">

      <div className="card-header bg-primary text-white">
        <h3 className="mb-0">
          📅 Book Appointment
        </h3>
      </div>

      <div className="card-body">

        <div className="row g-4">

          {/* Left Form */}
          <div className="col-lg-8">

            <form onSubmit={handleSubmit}>

              <div className="row">

                {/* Patient Name */}
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">
                    Patient Name
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Time */}
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">
                    Appointment Time
                  </label>

                  <select
                    className="form-select"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                  >
                    <option value="">
                      Select Time
                    </option>

                    <option value="09:00 AM">
                      09:00 AM
                    </option>

                    <option value="10:00 AM">
                      10:00 AM
                    </option>

                    <option value="11:00 AM">
                      11:00 AM
                    </option>

                    <option value="02:00 PM">
                      02:00 PM
                    </option>

                    <option value="03:00 PM">
                      03:00 PM
                    </option>

                  </select>
                </div>

                {/* Email */}
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">
                    Email
                  </label>

                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Mobile */}
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">
                    Mobile
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Doctor */}
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">
                    Doctor
                  </label>

                  <select
                    className="form-select"
                    name="doctor"
                    value={formData.doctor}
                    onChange={handleChange}
                    required
                  >
                    <option value="">
                      Select Doctor
                    </option>

                    {doctors.map((doctor) => (
                      <option
                        key={doctor._id}
                        value={doctor.name}
                      >
                        {doctor.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">
                    Date
                  </label>

                  <input
                    type="date"
                    className="form-control"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Symptoms */}
                <div className="col-12 mb-3">
                  <label className="form-label fw-bold">
                    Symptoms
                  </label>

                  <textarea
                    rows="4"
                    className="form-control"
                    name="symptoms"
                    value={formData.symptoms}
                    onChange={handleChange}
                    required
                  />
                </div>

              </div>

              <div className="alert alert-info">
                <strong>Note:</strong>
                Please arrive 10 minutes before your appointment.
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg w-100"
              >
                Confirm Appointment
              </button>

            </form>

          </div>

          {/* Right Side */}
          <div className="col-lg-4">

            <div className="card shadow-sm h-100">

              <div className="card-body text-center">

                <div className="display-1">
                  👨‍⚕️
                </div>

                <h4>
                  Doctor Availability
                </h4>

                <hr />

                {formData.doctor ? (
                  <>
                    <h5 className="text-success">
                      Selected Doctor
                    </h5>

                    <p className="fw-bold">
                      {formData.doctor}
                    </p>

                    <div className="alert alert-success">
                      Ready for booking
                    </div>
                  </>
                ) : (
                  <div className="alert alert-warning">
                    Select a doctor first
                  </div>
                )}

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  </div>
</div>
  );
}

