const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    patientName: { type: String, required: true },
    doctorName: { type: String, required: true },
    date: { type: Date, required: true },
});

const Appointment = mongoose.model('Appointment', AppointmentSchema);
module.exports = Appointment;
