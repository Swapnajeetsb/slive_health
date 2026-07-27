import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";
import AdminSidebar from "./AdminSidebar";

function ManageUsers() {
  const [users, setUsers] =
    useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers =
    async () => {
      try {
        const { data } =
          await axios.get(
            "http://localhost:3001/admin/users"
          );

        console.log(
          "Users:",
          data
        );

        setUsers(
          data.users
        );
      } catch (error) {
        console.log(error);
      }
    };

  const deleteUser =
    async (id) => {
      try {
        await axios.delete(
          `http://localhost:3001/admin/user/${id}`
        );

        getUsers();
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


      <div className="col-9"
        style={{
          flex: 1,
          padding: "30px",
        }}
      >
        <h1>
          Manage Users
        </h1>

        <table className="table table-bordered mt-4">
          <thead>
            <tr>
              <th>Name</th>

              <th>Email</th>

              <th>
                Predictions
              </th>

              <th>
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {users?.length >
            0 ? (
              users.map(
                (user) => (
                  <tr
                    key={
                      user._id
                    }
                  >
                    <td>
                      {
                        user.username
                      }
                    </td>

                    <td>
                      {
                        user.email
                      }
                    </td>

                    <td>
                      {user
                        .checkup
                        ?.length ||
                        0}
                    </td>

                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() =>
                          deleteUser(
                            user._id
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
                  colSpan="4"
                  className="text-center"
                >
                  No Users Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageUsers;