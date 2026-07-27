const {model} = require( "mongoose");
const { appointmentSchema}= require( "../Schema/AppointmentSchema");

const AppointmentModel = new model("Appointment", appointmentSchema);

module.exports= {AppointmentModel};