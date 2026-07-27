import React, { useEffect, useState } from "react";
import "./Doctercompneent.css";
import DoctorSidebar  from "./SideBar";
import axios from "axios";

export default function DoctorDashboard() {
  const [doctor, setDoctor] = useState(null);
  const [allpetionts, setAllpetionts] = useState([]);
  const [allpridiction, setAllpridiction] = useState([]);
  const [appointments, setAppointments] = useState([]);

  // Doctor Data
  useEffect(() => {
    const doctorData = JSON.parse(localStorage.getItem("doctor"));

    if (doctorData) {
      setDoctor(doctorData);

      axios
        .get(`http://localhost:3001/doctorAppointments/Dr.${doctorData.name}`)
        .then((res) => {
          console.log("Appointments:", res.data);
          setAppointments(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  // Total Patients
  useEffect(() => {
    axios.get("http://localhost:3001/allpetionts").then((res) => {
      setAllpetionts(res.data);
    });
  }, []);

  // Total Predictions
  useEffect(() => {
    axios.get("http://localhost:3001/allpridictions").then((res) => {
      setAllpridiction(res.data);
    });
  }, []);

  // Status Update
  const updateStatus = async (id, status) => {
    try {
      const res = await axios.put(
        `http://localhost:3001/appointment/status/${id}`,
        { status },
      );

      setAppointments((prev) =>
        prev.map((item) => (item._id === id ? { ...item, status } : item)),
      );

      alert(`Appointment ${status} successfully`);

      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  const todayAppointments = appointments.filter((item) => item.date === today);

  const upcomingAppointments = appointments.filter((item) => {
    const appointmentDate = new Date(item.date);

    const currentDate = new Date();

    currentDate.setHours(0, 0, 0, 0);

    const diff = (appointmentDate - currentDate) / (1000 * 60 * 60 * 24);

    return diff >= 0 && diff <= 7;
  });

  return (
    <div className=" row dashboard">
    <div className="col-3">
    <DoctorSidebar />
    </div>
      

      <div className=" col-9 content">
        <div className="topbar">
          <div>
            <h3>Doctor Dashboard</h3>

            <p className="text-muted">Welcome back, Dr. {doctor?.name}</p>
          </div>

          <div className="doctor-info">
            <div className="doctor-name">Dr. {doctor?.name}</div>

            <small>{doctor?.specialization}</small>
          </div>
        </div>

        {/* Stats */}
        <div className="row">
          <div className="col-md-3">
            <div className="stats-card">
              <small>Today's Appointments</small>

              <div className="stats-value">{todayAppointments.length}</div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="stats-card">
              <small>Total Patients</small>

              <div className="stats-value">{allpetionts.length}</div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="stats-card">
              <small>Total Appointments</small>

              <div className="stats-value">{appointments.length}</div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="stats-card">
              <small>Total Predictions</small>

              <div className="stats-value">{allpridiction.length}</div>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          {/* Today */}
          <div className="col-lg-6">
            <div className="box">
              <h5>Today's Appointments</h5>

              <table className="table">
                <tbody>
                  {todayAppointments.length > 0 ? (
                    todayAppointments.map((item) => (
                      <tr key={item._id}>
                        <td>{item.time}</td>

                        <td>{item.patientName}</td>

                        <td>{item.status}</td>

                        <td>
                          {item.status === "pending" && (
                            <>
                              <button
                                className="btn btn-success btn-sm me-2"
                                onClick={() =>
                                  updateStatus(item._id, "accepted")
                                }
                              >
                                Accept
                              </button>

                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() =>
                                  updateStatus(item._id, "rejected")
                                }
                              >
                                Reject
                              </button>
                            </>
                          )}

                          {item.status === "accepted" && (
                            <span className="badge bg-success">Accepted</span>
                          )}

                          {item.status === "rejected" && (
                            <span className="badge bg-danger">Rejected</span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td>No Appointments Today</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Upcoming */}
          <div className="col-lg-6">
            <div className="box">
              <h5>Upcoming Appointments (7 Days)</h5>

              <table className="table">
                <tbody>
                  {upcomingAppointments.length > 0 ? (
                    upcomingAppointments.map((item) => (
                      <tr key={item._id}>
                        <td>{item.date}</td>

                        <td>{item.patientName}</td>

                        <td>{item.time}</td>

                        <td>{item.status}</td>

                        <td>
                          {item.status === "pending" && (
                            <>
                              <button
                                className="btn btn-success btn-sm me-2"
                                onClick={() =>
                                  updateStatus(item._id, "accepted")
                                }
                              >
                                Accept
                              </button>

                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() =>
                                  updateStatus(item._id, "rejected")
                                }
                              >
                                Reject
                              </button>
                            </>
                          )}

                          {item.status === "accepted" && (
                            <span className="badge bg-success">Accepted</span>
                          )}

                          {item.status === "rejected" && (
                            <span className="badge bg-danger">Rejected</span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td>No Upcoming Appointments</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
