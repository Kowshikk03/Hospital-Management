const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const appointmentRoutes = require('./routes/appointments');
const doctorRoutes = require('./routes/doctors');
const patientRoutes = require('./routes/patients');
require('dotenv').config();  // Add this to load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // You can remove bodyParser since it's included in express

// MongoDB connection
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/hospital'; // Use .env file for MongoDB URI
mongoose.connect(mongoURI, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('MongoDB connected');
})
.catch(err => {
    console.error('MongoDB connection error:', err);
});

// Routes
app.use('/appointments', appointmentRoutes);
app.use('/doctors', doctorRoutes);
app.use('/patients', patientRoutes);

// Catch 404 errors
app.use((req, res, next) => {
    res.status(404).send({ message: 'Route not found' });
});

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
