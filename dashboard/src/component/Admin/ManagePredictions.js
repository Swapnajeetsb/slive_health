import React,
{
  useEffect,
  useState
}
from "react";

import axios from "axios";
import AdminSidebar from "./AdminSidebar";

function ManagePredictions() {

  const [predictions,
    setPredictions] =
    useState([]);

  useEffect(() => {
    fetchPredictions();
  }, []);

  const fetchPredictions =
    async () => {

      try {

        const { data } =
          await axios.get(
            "https://slive-health.onrender.com/getPredictions"
          );

        setPredictions(
          data.predictions
        );

      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className="admin-container">

      <AdminSidebar />

      <div className="main-content">

        <h2>
          Predictions
        </h2>

        <table className="table table-bordered">

          <thead>
            <tr>
              <th>Disease</th>
              <th>Percentage</th>
            </tr>
          </thead>

          <tbody>

            {predictions.map(
              (item) => (
              <tr key={item._id}>
                <td>
                  {item.disease}
                </td>

                <td>
                  {item.percentage}%
                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>
    </div>
  );
}

export default ManagePredictions;