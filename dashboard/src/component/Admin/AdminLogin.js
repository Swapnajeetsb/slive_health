import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminLogin() {

const navigate = useNavigate();

const [adminData, setAdminData] = useState({
email: "",
password: "",
});

const handleChange = (e) => {
const { name, value } = e.target;

setAdminData((prev) => ({
  ...prev,
  [name]: value,
}));


};

const handleSubmit = async (e) => {
e.preventDefault();


try {

  const { data } = await axios.post(
    "http://localhost:3001/admin/login",
    adminData,
    {
      withCredentials: true,
    }
  );

  if (data.success) {

    toast.success(data.message);

    localStorage.setItem(
      "admin",
      JSON.stringify(data.admin)
    );

    setTimeout(() => {
      navigate("/AdminDashboard");
    }, 1000);

  } else {
    toast.error(data.message);
  }

} catch (error) {
  console.log(error);

  toast.error("Login Failed");
}


};

return (
<div
className="container-fluid vh-100 d-flex justify-content-center align-items-center"
style={{
background:
"linear-gradient(135deg,#0d6efd,#6610f2)",
}}
>
<div
className="card shadow-lg p-4"
style={{
width: "420px",
borderRadius: "15px",
}}
> <h2 className="text-center text-primary mb-4">
Admin Login </h2>

    <form onSubmit={handleSubmit}>

      <div className="mb-3">
        <label className="form-label">
          Email
        </label>

        <input
          type="email"
          name="email"
          className="form-control"
          placeholder="Enter Admin Email"
          value={adminData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">
          Password
        </label>

        <input
          type="password"
          name="password"
          className="form-control"
          placeholder="Enter Password"
          value={adminData.password}
          onChange={handleChange}
          required
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary w-100"
      >
        Login
      </button>

    </form>
  </div>

  <ToastContainer />
</div>

);
}

export default AdminLogin;
