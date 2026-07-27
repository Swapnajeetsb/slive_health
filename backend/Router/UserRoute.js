require('dotenv').config();
const express = require("express");
const router = require("express").Router();
const  mongoose = require("mongoose");
const {pridicationModel} = require("../Model/pridication");
const {userModel} = require("../Model/userModel");
const {docterModel} = require("../Model/docterModel");
const {AppointmentModel} = require("../Model/AppointmentModel");
const bodyparser = require("body-parser");
const { createSecretToken } = require("../util/SecretToken");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const{ CookiesProvider }= require( "react-cookie");
const cors = require("cors");
// const { default: mongoose } = require('mongoose');

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // console.log(email, password);

    const user = await userModel.findOne({ email });

    // console.log(user);

    if (!user) {
      return res.json({
        success: false,
        message: "Incorrect password or email",
      });
    }

    const auth = await bcrypt.compare(
      password,
      user.password
    );

    // console.log(auth);

    if (!auth) {
      return res.json({
        success: false,
        message: "Incorrect password or email",
      });
    }

    const token = createSecretToken(user._id);

    res.cookie("token", token, {
  httpOnly: true,
  secure: false,
  sameSite: "lax",
  path: "/",
  maxAge: 7 * 24 * 60 * 60 * 1000,
});
// console.log("Cookie Sent");

    return res.status(200).json({
      message: "User logged in successfully",
      success: true,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

router.get("/logout", (req, res) => {

  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax"
  });

  res.status(200).json({
    message: "Logout successful"
  });

});

module.exports.userVerification = (req, res) => {
  const token = req.cookies.token
  if (!token) {
    return res.json({ status: false })
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
     return res.json({ status: false })
    } else {
      const user = await userModel.findById(data.id)
      if (user) return res.json({ status: true, user: user.username })
      else return res.json({ status: false })
    }
  })
}

router.get("/getUser/:id", async (req, res) => {
  try {
    const user = await userModel
      .findById(req.params.id)
      .populate("checkup");

    // console.log(user.checkup[0]);

    res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { email, password, username } = req.body;

    // Check user already exists
    const existingUser = await userModel.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Create new user
    const user = await userModel.create({
      email,
      password,
      username,
    });

    // Create token
    const token = createSecretToken(user._id);

    // Save token in cookie
   res.cookie("token", token, {
  httpOnly: true,
  secure:false,
  sameSite: "none",
});

    // Response
    return res.status(201).json({
      success: true,
      message: "User signed up successfully",
      user,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

router.get("/verify", (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      success: false,
    });
  }

  try {
    jwt.verify(token, process.env.TOKEN_KEY);

    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
    });
  }
});

module.exports = router;