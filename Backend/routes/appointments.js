const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// Get all appointments
router.get('/', async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add new appointment
router.post('/add', async (req, res) => {
    const newAppointment = new Appointment(req.body);
    try {
        const savedAppointment = await newAppointment.save();
        res.status(201).json(savedAppointment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update appointment
router.post('/update/:id', async (req, res) => {
    try {
        const updatedAppointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedAppointment);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Delete appointment
router.delete('/delete/:id', async (req, res) => {
    try {
        await Appointment.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

module.exports = router;
