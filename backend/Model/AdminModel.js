const { model } = require("mongoose");

const {
  AdminSchema,
} = require("../Schema/AdminSchema");

const AdminModel = new model(
  "admin",
  AdminSchema
);

module.exports = {
  AdminModel,
};