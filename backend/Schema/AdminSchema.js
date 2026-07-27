const { Schema } = require("mongoose");
const bcrypt = require("bcryptjs");

const AdminSchema = new Schema({
  username: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    default: "admin",
  },
});

AdminSchema.pre("save", async function () {
  this.password = await bcrypt.hash(
    this.password,
    12
  );
});

module.exports = { AdminSchema };