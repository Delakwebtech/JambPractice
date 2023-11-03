const express = require('express');
const mongoose = require('mongoose');
const app = express();
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load env vars 
dotenv.config({path: './config/config.env'});


// connect to database
connectDB();


// Middleware
app.use(express.json());


// Cookie Parser
app.use(cookieParser());


// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}


// Routes
const authRoutes = require('./routes/authRoutes');
const examRoutes = require('./routes/examRoutes');
const resultRoutes = require('./routes/resultRoutes');


// Mount routers
app.use('/auth', authRoutes);
app.use('/exam', examRoutes);
app.use('/', resultRoutes);

const PORT = process.env.PORT || 5000;

app.listen(
    PORT, 
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

