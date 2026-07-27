const { Schema } = require("mongoose");
const bcrypt = require("bcryptjs");

const DoterSchema = new Schema({
  name: String,
  email: String,
  phone: Number,
  specialization: String,
  experience: Number,
  qualification: String,
  hospital: String,
  image: String,

  username: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  workingDays: [
    {
      type: String,
    },
  ],

  startTime: {
    type: String,
    default: "09:00",
  },

  endTime: {
    type: String,
    default: "17:00",
  },
});

DoterSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

module.exports = { DoterSchema };