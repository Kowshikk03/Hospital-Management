const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');

// Get all patients
router.get('/', async (req, res) => {
    try {
        const patients = await Patient.find();
        res.json(patients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add new patient
router.post('/add', async (req, res) => {
    const newPatient = new Patient(req.body);
    try {
        const savedPatient = await newPatient.save();
        res.status(201).json(savedPatient);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update patient
router.post('/update/:id', async (req, res) => {
    try {
        const updatedPatient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedPatient);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Delete patient
router.delete('/delete/:id', async (req, res) => {
    try {
        await Patient.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

module.exports = router;
