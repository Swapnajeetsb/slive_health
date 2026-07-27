import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";
import AdminSidebar from "./AdminSidebar";

function ManageDoctors() {

  const [doctors,
    setDoctors] =
    useState([]);

  useEffect(() => {
    getDoctors();
  }, []);

  const getDoctors =
    async () => {

      try {

        const { data } =
          await axios.get(
            "https://slive-health.onrender.com/admin/doctors"
          );

        console.log(
          "Doctors Data:",
          data
        );

        setDoctors(
          data.doctors
        );

      } catch (error) {
        console.log(error);
      }
    };

  const deleteDoctor =
    async (id) => {

      try {

        await axios.delete(
          `https://slive-health.onrender.com/admin/doctor/${id}`
        );

        getDoctors();

      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div
      style={{
        display: "flex",
      }}
    >
       <div className="col-3">
        <AdminSidebar />
      </div>

      <div 
      className="col-9"
        style={{
          flex: 1,
          padding: "30px",
        }}
      >

        <h1>
          Manage Doctors
        </h1>

        <div className="row mt-4">

          {doctors?.length >
          0 ? (

            doctors.map(
              (doctor) => (

                <div
                  className="col-md-4 mb-4"
                  key={
                    doctor._id
                  }
                >
                  <div className="card shadow p-3">

                    <img
                      src={
                        doctor.image
                      }
                      alt=""
                      style={{
                        height:
                          "220px",
                        objectFit:
                          "cover",
                        borderRadius:
                          "10px",
                      }}
                    />

                    <h4 className="mt-3">
                      Dr.
                      {
                        doctor.name
                      }
                    </h4>

                    <p>
                      <strong>
                        Specialization:
                      </strong>{" "}
                      {
                        doctor.specialization
                      }
                    </p>

                    <p>
                      <strong>
                        Hospital:
                      </strong>{" "}
                      {
                        doctor.hospital
                      }
                    </p>

                    <p>
                      <strong>
                        Experience:
                      </strong>{" "}
                      {
                        doctor.experience
                      }{" "}
                      Years
                    </p>

                    <button
                      className="btn btn-danger w-100"
                      onClick={() =>
                        deleteDoctor(
                          doctor._id
                        )
                      }
                    >
                      Delete Doctor
                    </button>

                  </div>
                </div>
              )
            )

          ) : (

            <h4 className="text-center">
              No Doctors Found
            </h4>
          )}

        </div>
      </div>
    </div>
  );
}

export default ManageDoctors;