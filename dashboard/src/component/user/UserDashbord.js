
import React, {
  useState,
  useEffect
} from "react";

import SideMaue from "./SideBar";
import axios from "axios";
import "./user.css";

function PatientDashboard() {

  const [user, setUser] =
    useState(null);

  const [history, setHistory] =
    useState([]);

  // LocalStorage user
  useEffect(() => {

    const userData =
      JSON.parse(
        localStorage.getItem(
          "user"
        )
      );

    setUser(userData);

  }, []);

  // Fetch prediction history
  useEffect(() => {

    const fetchUser =
      async () => {

        try {

          const savedUser =
            JSON.parse(
              localStorage.getItem(
                "user"
              )
            );

          if (
            !savedUser?._id
          )
            return;

          const { data } =
            await axios.get(
              `https://slive-health.onrender.com/getUser/${savedUser._id}`
            );

          console.log(
            "History User:",
            data.user
          );

          // checkup array save
          setHistory(
            data.user.checkup || []
          );

        } catch (error) {
          console.log(error);
        }
      };

    fetchUser();

  }, []);

  // Loading
  if (!user) {
    return (
      <h2 className="text-center mt-5">
        Loading...
      </h2>
    );
  }

  // Latest prediction
  const latestPrediction =
    history.length > 0
      ? history[
          history.length - 1
        ]
      : null;

  return (
    <div className="container-fluid p-0">

      <div className="row g-0">

        {/* Sidebar */}
        <div className="col-lg-2 col-md-3 p-0">
          <SideMaue />
        </div>

        {/* Main Content */}
        <div className="col-md-10 p-4">

          {/* Welcome Card */}
          <div className="card shadow-sm border-0 p-4 mb-4">

            <h2>
              Welcome,
              {" "}
              {user?.username}
            </h2>

            <p className="text-muted">
              Monitor your health prediction reports.
            </p>

          </div>

          <div className="row">

            {/* Profile Card */}
            <div className="col-lg-4 mb-4">

              <div className="card shadow-sm border-0 text-center p-4 h-100">

                <img
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt="profile"
                  width="100"
                  className="mx-auto rounded-circle"
                />

                <h4 className="mt-3 mb-1">
                  {user?.username}
                </h4>

                <p className="text-muted">
                  {user?.email}
                </p>

              </div>
            </div>

            {/* Latest Prediction */}
            <div className="col-lg-8 mb-4">

              <div className="card shadow-sm border-0 p-4 h-100">

                <h4>
                  Latest Prediction
                </h4>

                <div className="mt-4">

                  <h6>
                    Disease
                  </h6>

                  <span className="badge bg-danger fs-6 px-3 py-2">

                    {latestPrediction?.disease ||
                      "No Prediction"}

                  </span>
                </div>

                <div className="mt-4">

                  <h6>
                    Confidence
                  </h6>

                  <div
                    className="progress"
                    style={{
                      height:
                        "25px"
                    }}
                  >

                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{
                        width: `${
                          latestPrediction?.percentage || 0
                        }%`,
                      }}
                    >
                      {latestPrediction?.percentage || 0}%
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Prediction History */}
          <div className="card shadow-sm border-0 p-4 mb-4">

            <h4>
              Prediction History
            </h4>

            <table className="table table-hover mt-3">

              <thead>
                <tr>
                  <th>
                    Date
                  </th>

                  <th>
                    Disease
                  </th>

                  <th>
                    Confidence
                  </th>
                </tr>
              </thead>

              <tbody>

                {history.length >
                0 ? (

                  history.map(
                    (
                      item,
                      index
                    ) => (
                      <tr
                        key={
                          index
                        }
                      >

                        <td>
                          {item.createdAt
                            ? new Date(
                                item.createdAt
                              ).toLocaleDateString()
                            : "No Date"}
                        </td>

                        <td>
                          {
                            item.disease
                          }
                        </td>

                        <td>
                          {
                            item.percentage || 0
                          }
                          %
                        </td>

                      </tr>
                    )
                  )

                ) : (

                  <tr>
                    <td
                      colSpan="3"
                      className="text-center"
                    >
                      No Prediction History
                    </td>
                  </tr>

                )}

              </tbody>
            </table>
          </div>

          {/* Doctors */}
          <div className="card shadow-sm border-0 p-4">

            <h4>
              Recommended Doctors
            </h4>

            <div className="row mt-3">

              <div className="col-md-4">

                <div className="card border-0 shadow-sm p-3 text-center">

                  <img
                    src="https://cdn-icons-png.flaticon.com/512/2785/2785482.png"
                    width="80"
                    className="mx-auto rounded-circle"
                    alt=""
                  />

                  <h5 className="mt-3">
                    Dr. ABC
                  </h5>

                  <p className="text-muted">
                    Neurologist
                  </p>

                  <button className="btn btn-primary">
                    Book Appointment
                  </button>

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientDashboard;
