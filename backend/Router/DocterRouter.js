require('dotenv').config();
const express = require("express");
const router = require("express").Router();
const  mongoose = require("mongoose");
const {pridicationModel} = require("../Model/pridication");
const {userModel} = require("../Model/userModel");
const {docterModel} = require("../Model/docterModel");
const {AppointmentModel} = require("../Model/AppointmentModel");
const bodyparser = require("body-parser");
// const { createSecretToken } = require("./util/SecretToken");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const{ CookiesProvider }= require( "react-cookie");
const cors = require("cors");
// const { default: mongoose } = require('mongoose');

router.get("/DocterLogin",(req,res)=>{
    res.send("router");
});

router.post("/Doctor/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await docterModel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found"
      });
    }

    const auth = await bcrypt.compare(
      password,
      user.password
    );

    if (!auth) {
      return res.status(401).json({
        success: false,
        message: "Password not matched"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Doctor Login Successful",
      user
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
});

router.get("/allpetionts",async(req,res)=>{
    const allpetionts =  await userModel.find({});
    res.json(allpetionts);
});

router.get("/allpridictions",async(req,res)=>{
    const allpriduction =  await pridicationModel.find({});
    res.json(allpriduction);
});

router.get(
  "/doctorAppointments/:doctorName",
  async (req, res) => {
    try {

      const appointments =
        await AppointmentModel.find({
          doctor: req.params.doctorName
        });

      res.json(appointments);

    } catch (err) {
      res.status(500).json(err);
    }
  }
);



router.put(
  "/appointment/status/:id",
  async (req, res) => {
    try {
      const { status } = req.body;

      const updated =
        await AppointmentModel.findByIdAndUpdate(
          req.params.id,
          { status },
          { new: true }
        );

      res.json(updated);

    } catch (error) {
      console.log(error);
    }
  }
);


router.get("/doctor/:id/availability", async (req, res) => {
  try {

    const doctor = await docterModel.findById(req.params.id);

    const today = new Date();

    const dates = [];

    for(let i=0;i<30;i++){

      let d = new Date();

      d.setDate(today.getDate()+i);

      const dayName = d.toLocaleDateString(
        "en-US",
        { weekday:"long" }
      );

      if(
        doctor.workingDays.includes(dayName)
      ){
        dates.push(
          d.toISOString().split("T")[0]
        );
      }
    }

    res.json(dates);

  } catch(err){
    res.status(500).json(err);
  }
});


router.get(
"/doctor/:id/slots/:date",
async(req,res)=>{

 try{

  const doctor =
  await docterModel.findById(
    req.params.id
  );

  let slots=[];

  let start =
  Number(
   doctor.startTime.split(":")[0]
  );

  let end =
  Number(
   doctor.endTime.split(":")[0]
  );

  for(
    let i=start;
    i<end;
    i++
  ){

   let slot =
   `${i}:00`;

   const booked =
   await AppointmentModel.findOne({
      doctorId:req.params.id,
      date:req.params.date,
      time:slot
   });

   slots.push({
      time:slot,
      available:!booked
   });

  }

  res.json(slots);

 }catch(err){
  res.status(500).json(err);
 }

});


router.get("/allDoctors", async (req, res) => {
  try {

    const doctors =
      await docterModel.find();

    res.status(200).json(doctors);

  } catch (error) {

    res.status(500).json({
      message: "Server Error",
    });

  }
});


router.post("/Doctor/logout", (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false, // Production मध्ये true
      sameSite: "lax",
    });

    return res.status(200).json({
      success: true,
      message: "Doctor Logout Successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

module.exports = router;