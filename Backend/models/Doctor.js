const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    specialization: { type: String, required: true },
    experience: { type: Number, required: true },
});

const Doctor = mongoose.model('Doctor', DoctorSchema);
module.exports = Doctor;
