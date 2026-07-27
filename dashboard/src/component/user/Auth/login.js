import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ToastContainer,
  toast,
} from "react-toastify";

const Login = () => {
  const navigate =
    useNavigate();

  const [inputValue,
    setInputValue] =
    useState({
      email: "",
      password: "",
    });

  const [role, setRole] =
    useState("user");

  const handleOnChange = (
    e
  ) => {
    const {
      name,
      value,
    } = e.target;

    setInputValue(
      (prev) => ({
        ...prev,
        [name]: value,
      })
    );
  };

  const handleError =
    (err) =>
      toast.error(err, {
        position:
          "bottom-left",
      });

  const handleSuccess =
    (msg) =>
      toast.success(msg, {
        position:
          "bottom-left",
      });

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      // Doctor Login
      if (
        role === "doctor"
      ) {
        navigate(
          "/DocterLogin"
        );
        return;
      }

      // Admin Login
      if (
        role === "admin"
      ) {
        navigate("/Admin");
        return;
      }

      // User Login API
      try {
        const { data } =
          await axios.post(
            "http://localhost:3001/login",
            inputValue,
            {
              withCredentials: true,
            }
          );

        const {
          success,
          message,
          user,
        } = data;

        if (
          success
        ) {
          handleSuccess(
            message
          );

          if (user) {
            localStorage.setItem(
              "user",
              JSON.stringify(
                user
              )
            );
          }

          setTimeout(
            () => {
              navigate(
                "/Patient"
              );
            },
            1000
          );
        } else {
          handleError(
            message
          );
        }
      } catch (error) {
        console.log(
          error
        );

        handleError(
          "Server Error"
        );
      }

      setInputValue({
        email: "",
        password: "",
      });
    };

  return (
    <div className="container-fluid bg-light min-vh-100 d-flex align-items-center justify-content-center">

      <div
        className="card shadow-lg p-4"
        style={{
          width: "420px",
          borderRadius:
            "15px",
        }}
      >
        <h3 className="text-center mb-4 text-primary fw-bold">
          Login Account
        </h3>

        <form
          onSubmit={
            handleSubmit
          }
        >
          <div className="mb-3">
            <label className="form-label">
              Email
            </label>

            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter email"
              value={
                inputValue.email
              }
              onChange={
                handleOnChange
              }
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
              placeholder="Enter password"
              value={
                inputValue.password
              }
              onChange={
                handleOnChange
              }
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

        <p className="text-center mt-3 mb-0">
          Don't have an
          account?{" "}
          <Link
            to="/signup"
            className="text-decoration-none"
          >
            Signup
          </Link>
        </p>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Login;

