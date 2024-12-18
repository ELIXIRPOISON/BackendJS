const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jobRoutes = require('./routes/jobRoutes');

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use('/api', jobRoutes);

// Connect to MongoDB
mongoose
    .connect('mongodb+srv://user:psPtKumrnzhEJ0Kg@ecommerce.d381t.mongodb.net/jobposting')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('Error connecting to MongoDB:', err));

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
