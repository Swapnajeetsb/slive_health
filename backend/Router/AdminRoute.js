const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ================= MODELS =================

const { userModel } =
  require("../Model/userModel");

const { docterModel } =
  require("../Model/docterModel");

const { AppointmentModel } =
  require("../Model/AppointmentModel");

const { pridicationModel } =
  require("../Model/pridication");

const { AdminModel } =
  require("../Model/AdminModel");


// ==========================================
// ADMIN LOGIN
// ==========================================
router.post("/admin/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Email:", email);
    console.log("Password:", password);

    const admin = await AdminModel.findOne({ email });

    console.log("Admin Found:", admin);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin Not Found",
      });
    }

    console.log("DB Password:", admin.password);

    const match = await bcrypt.compare(
      password,
      admin.password
    );

    console.log("Password Match:", match);

    if (!match) {
      return res.status(400).json({
        success: false,
        message: "Wrong Password",
      });
    }

    res.status(200).json({
      success: true,
      message: "Admin Login Successful",
    });

  } catch (error) {
    console.log("LOGIN ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ==========================================
// DASHBOARD STATS
// ==========================================
router.get(
  "/admin/dashboard",
  async (req, res) => {
    try {
      const totalUsers =
        await userModel.countDocuments();

      const totalDoctors =
        await docterModel.countDocuments();

      const totalAppointments =
        await AppointmentModel.countDocuments();

      const totalPredictions =
        await pridicationModel.countDocuments();

      const recentAppointments =
        await AppointmentModel.find()
          .sort({
            createdAt: -1,
          })
          .limit(5);

      res.status(200).json({
        success: true,

        stats: {
          totalUsers,
          totalDoctors,
          totalAppointments,
          totalPredictions,
        },

        recentAppointments,
      });
    } catch (error) {
      console.log(
        "Dashboard Error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Dashboard Error",
      });
    }
  }
);


// ==========================================
// GET ALL USERS
// ==========================================
router.get(
  "/admin/users",
  async (req, res) => {
    try {
      const users =
        await userModel
          .find()
          .populate(
            "checkup"
          );

      res.status(200).json({
        success: true,
        users,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Users Fetch Failed",
      });
    }
  }
);


// ==========================================
// DELETE USER
// ==========================================
router.delete(
  "/admin/user/:id",
  async (req, res) => {
    try {
      await userModel.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({
        success: true,
        message:
          "User Deleted Successfully",
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Delete Failed",
      });
    }
  }
);


// ==========================================
// GET ALL DOCTORS
// ==========================================
router.get(
  "/admin/doctors",
  async (req, res) => {
    try {
      const doctors =
        await docterModel.find();

      res.status(200).json({
        success: true,
        doctors,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Doctor Fetch Failed",
      });
    }
  }
);


// ==========================================
// DELETE DOCTOR
// ==========================================
router.delete(
  "/admin/doctor/:id",
  async (req, res) => {
    try {
      await docterModel.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({
        success: true,
        message:
          "Doctor Deleted",
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Delete Failed",
      });
    }
  }
);


// ==========================================
// GET APPOINTMENTS
// ==========================================
router.get(
  "/admin/appointments",
  async (req, res) => {
    try {
      const appointments =
        await AppointmentModel.find()
          .sort({
            createdAt: -1,
          });

      res.status(200).json({
        success: true,
        appointments,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
      });
    }
  }
);


// ==========================================
// UPDATE APPOINTMENT STATUS
// ==========================================
router.put(
  "/admin/appointment/:id",
  async (req, res) => {
    try {
      const {
        status,
      } = req.body;

      const appointment =
        await AppointmentModel.findByIdAndUpdate(
          req.params.id,
          { status },
          { new: true }
        );

      res.status(200).json({
        success: true,
        appointment,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
      });
    }
  }
);


// ==========================================
// DELETE APPOINTMENT
// ==========================================
router.delete(
  "/admin/appointment/:id",
  async (req, res) => {
    try {
      await AppointmentModel.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({
        success: true,
        message:
          "Appointment Deleted",
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
      });
    }
  }
);


// ==========================================
// GET ALL PREDICTIONS
// ==========================================
router.get(
  "/admin/predictions",
  async (req, res) => {
    try {
      const predictions =
        await pridicationModel
          .find()
          .populate(
            "owner",
            "username email"
          );

      res.status(200).json({
        success: true,
        predictions,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
      });
    }
  }
);

module.exports = router;