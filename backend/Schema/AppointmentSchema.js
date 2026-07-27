const {Schema} = require("mongoose");

const appointmentSchema = new Schema(
  {
    patientName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    mobile: {
      type: String,
      required: true,
    },
    doctorId: {
     type: Schema.Types.ObjectId,
       ref: "doctor",
      },

    doctor: {
      type: String,
      required: true,
    },

    date: {
      type: String,
      required: true,
    },
      status: {
      type: String,
      enum: [
        "pending",
        "accepted",
        "rejected",
        "completed",
      ],
      default: "pending",
    },

    time: {
      type: String,
      required: true,
    },

    symptoms: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);



module.exports = {
  appointmentSchema
};