import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";
import AdminSidebar from "./AdminSidebar";

function ManageAppointments() {

  const [appointments,
    setAppointments] =
    useState([]);

  useEffect(() => {
    getAppointments();
  }, []);

  const getAppointments =
    async () => {

      try {

        const { data } =
          await axios.get(
            "https://slive-health.onrender.com/admin/appointments"
          );

        console.log(
          "Appointments:",
          data
        );

        setAppointments(
          data.appointments
        );

      } catch (error) {
        console.log(error);
      }
    };

  // status update
  const updateStatus =
    async (
      id,
      status
    ) => {

      try {

        await axios.put(
          `https://slive-health.onrender.com/admin/appointment/${id}`,
          { status }
        );

        getAppointments();

      } catch (error) {
        console.log(error);
      }
    };

  // delete appointment
  const deleteAppointment =
    async (id) => {

      try {

        await axios.delete(
          `https://slive-health.onrender.com/admin/appointment/${id}`
        );

        getAppointments();

      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className="row"
      style={{
        display: "flex",
      }}
    >
      <div className="col-3">
        <AdminSidebar />
      </div>
      

      <div className="col-9"
        style={{
          flex: 1,
          padding: "30px",
        }}
      >

        <h1>
          Manage Appointments
        </h1>

        <table className="table table-bordered table-hover mt-4">

          <thead className="table-dark">
            <tr>
              <th>
                Patient
              </th>

              <th>
                Email
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

              <th>
                Action
              </th>
            </tr>
          </thead>

          <tbody>

            {appointments
              ?.length >
            0 ? (

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
                        item.email
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

                      <select
                        className="form-select"
                        value={
                          item.status
                        }
                        onChange={(
                          e
                        ) =>
                          updateStatus(
                            item._id,
                            e
                              .target
                              .value
                          )
                        }
                      >

                        <option value="pending">
                          Pending
                        </option>

                        <option value="accepted">
                          Accepted
                        </option>

                        <option value="rejected">
                          Rejected
                        </option>

                        <option value="completed">
                          Completed
                        </option>

                      </select>

                    </td>

                    <td>

                      <button
                        className="btn btn-danger"
                        onClick={() =>
                          deleteAppointment(
                            item._id
                          )
                        }
                      >
                        Delete
                      </button>

                    </td>
                  </tr>
                )
              )

            ) : (

              <tr>
                <td
                  colSpan="7"
                  className="text-center"
                >
                  No Appointments Found
                </td>
              </tr>
            )}

          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageAppointments;