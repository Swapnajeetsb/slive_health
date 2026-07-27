import React, { useState } from "react";
import axios from "axios";

function DoctorForm() {
  const [doctor, setDoctor] = useState({
    name: "",
    email: "",
    phone: "",
    specialization: "",
    experience: "",
    qualification: "",
    hospital: "",
    image: "",
    username:"",
    password :"",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3001/newDocter",
        doctor
      );

      console.log(res.data);
      alert("Doctor Added Successfully");

      // form reset
      setDoctor({
        name: "",
        email: "",
        phone: "",
        specialization: "",
        experience: "",
        qualification: "",
        hospital: "",
        image: "",
        username:"",
        password:"",
      });

    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  const handleChange = (e) => {
    setDoctor({
      ...doctor,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="doctor-page">
      <div className="doctor-card">

        <h2 className="doctor-title">
          Add New Doctor
        </h2>

        <form onSubmit={handleSubmit}>

          <div className="row">

            <div className="col-md-6">
              <label>Doctor Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Enter Doctor Name"
                value={doctor.name}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label>Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter Email"
                value={doctor.email}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mt-3">
              <label>Phone Number</label>
              <input
                type="text"
                name="phone"
                className="form-control"
                placeholder="Enter Phone"
                value={doctor.phone}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mt-3">
              <label>Specialization</label>
              <select
                className="form-control"
                name="specialization"
                value={doctor.specialization}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="Cardiologist">Cardiologist</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="ENT Specialist">ENT Specialist</option>
              </select>
            </div>

            <div className="col-md-6 mt-3">
              <label>Experience</label>
              <input
                type="number"
                name="experience"
                className="form-control"
                placeholder="Years of Experience"
                value={doctor.experience}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mt-3">
              <label>Qualification</label>
              <input
                type="text"
                name="qualification"
                className="form-control"
                placeholder="MBBS, MD..."
                value={doctor.qualification}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-12 mt-3">
              <label>Hospital Name</label>
              <input
                type="text"
                name="hospital"
                className="form-control"
                placeholder="Hospital Name"
                value={doctor.hospital}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-12 mt-3">
              <label>Profile Image</label>
              <input
                type="text"
                name="image"
                className="form-control"
                placeholder="Enter Image URL"
                value={doctor.image}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6 mt-3">
              <label>Select UserName</label>
              <input
                type="text"
                name="username"
                className="form-control"
                placeholder="Enter username"
                value={doctor.username}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6 mt-3">
              <label>Set Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter password"
                value={doctor.password}
                onChange={handleChange}
              />
            </div>

          </div>

          <button
            type="submit"
            className="btn btn-primary doctor-btn mt-4"
          >
            Add Doctor
          </button>

        </form>

      </div>
    </div>
  );
}

export default DoctorForm;