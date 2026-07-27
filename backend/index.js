require('dotenv').config();
const express = require("express");
const  mongoose = require("mongoose");
const {pridicationModel} = require("./Model/pridication");
const {userModel} = require("./Model/userModel");
const {docterModel} = require("./Model/docterModel");
const {AppointmentModel} = require("./Model/AppointmentModel");
const bodyparser = require("body-parser");
const { createSecretToken } = require("./util/SecretToken");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const{ CookiesProvider }= require( "react-cookie");
const cors = require("cors");
const DocterRouter = require("./Router/DocterRouter");
const AdminRouter = require("./Router/AdminRoute")
const UserRoute = require("./Router/UserRoute");
const { PythonShell } =
require("python-shell");

const app = express();
app.use(cookieParser());

app.use(
  cors({
    origin:"https://slive-health-1.onrender.com", 
     // frontend URL
    credentials: true,
  })
);
app.use(express.json());

const db_url = process.env.MONGO_URL;
try{
   mongoose.connect(db_url);
   console.log("HI i am databese ");
}catch(e) {
   console.log(e);
}

app.post("/predict", async (req, res) => {
  try {
      console.log("Cookies:", req.cookies);
    console.log("Token:", req.cookies.token);

    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please login first",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.TOKEN_KEY
    );

    const userId = decoded.id;

    console.log("Logged User ID:", userId);

    const {
      conductivity,
      oxygen,
      methane,
      ammonia,
    } = req.body;

    // ==========================
    // Get Previous Prediction
    // ==========================

    const previousPrediction =
      await pridicationModel
        .findOne({ owner: userId })
        .sort({ createdAt: -1 });

    const options = {
      args: [
        conductivity,
        oxygen,
        methane,
        ammonia,
      ],
    };

    const path = require("path");

    const result = await PythonShell.run(
      path.join(
        __dirname,
        "python",
        "predict.py"
      ),
      options
    );

    const predictionData =
      JSON.parse(result[0]);

    const topDisease =
      predictionData.reduce(
        (max, current) =>
          current.percentage >
          max.percentage
            ? current
            : max
      );

    // ==========================
    // Compare Prediction
    // ==========================

    let condition = "First Checkup";
    let difference = 0;

    if (previousPrediction) {

      difference = Math.abs(
        topDisease.percentage -
        previousPrediction.percentage
      ).toFixed(2);

      if (
        topDisease.percentage <
        previousPrediction.percentage
      ) {

        condition = "Improving";

      } else if (
        topDisease.percentage >
        previousPrediction.percentage
      ) {

        condition = "Worsening";

      } else {

        condition = "Stable";
      }
    }

    // ==========================
    // Save Prediction
    // ==========================

    const newPrediction =
      await pridicationModel.create({

        owner: userId,

        conductivity,

        oxygen,

        methane,

        ammonia,

        disease:
          topDisease.disease,

        percentage:
          topDisease.percentage,

      });

    const user =
      await userModel.findById(userId);

    if (!user) {

      return res.status(404).json({
        success: false,
        message: "User not found",
      });

    }

    user.checkup.push(newPrediction._id);

    await user.save();

    // ==========================
    // Send Response
    // ==========================

    res.status(200).json({

      success: true,

      result: predictionData,

      predictedDisease:
        topDisease.disease,

      confidence:
        topDisease.percentage,

      previousPrediction:
        previousPrediction
          ? previousPrediction.percentage
          : null,

      condition,

      difference,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: "Server Error",

    });


  }

});

    

// docter Rlute

app.post("/newDocter", async (req, res) => {
  try {
    const newdocter = new docterModel({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      specialization: req.body.specialization,
      experience: req.body.experience,
      qualification: req.body.qualification,
      hospital: req.body.hospital,
      image: req.body.image,
      username: req.body.username,
      password: req.body.password,
    });

    const addedDocter = await newdocter.save();

    console.log(addedDocter);

    res.status(201).json({
      message: "Doctor Added Successfully",
      doctor: addedDocter,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error adding doctor",
    });
  }
});

app.post(
"/BookAppointment",
async(req,res)=>{

try{

 const {
  patientName,
  email,
  mobile,
  doctorId,
  doctor,
  date,
  time,
  symptoms
 } = req.body;

 const exists =
 await AppointmentModel.findOne({
   doctorId,
   date,
   time
 });

 if(exists){

   return res.status(400)
   .json({
      message:
      "Slot already booked"
   });

 }

 const appointment =
 await AppointmentModel.create({

   patientName,
   email,
   mobile,
   doctorId,
   doctor,
   date,
   time,
   symptoms

 });

 res.status(201)
 .json(appointment);

}catch(err){

 res.status(500).json(err);

}

});
app.use("/", UserRoute);
//  Docter login
app.use("/",DocterRouter);

app.use("/",AdminRouter);



app.listen(3001,
() => {
    console.log(
        "Server Running"
    );
});