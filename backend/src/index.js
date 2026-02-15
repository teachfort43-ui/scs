const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Routes
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/users', require('./routes/users'));
app.use('/api/v1/students', require('./routes/students'));
app.use('/api/v1/teachers', require('./routes/teachers'));
app.use('/api/v1/classes', require('./routes/classes'));
app.use('/api/v1/subjects', require('./routes/subjects'));
app.use('/api/v1/attendance', require('./routes/attendance'));
app.use('/api/v1/grades', require('./routes/grades'));
app.use('/api/v1/fees', require('./routes/fees'));
app.use('/api/v1/exams', require('./routes/exams'));
app.use('/api/v1/timetable', require('./routes/timetable'));
app.use('/api/v1/library', require('./routes/library'));
app.use('/api/v1/transport', require('./routes/transport'));
app.use('/api/v1/announcements', require('./routes/announcements'));

// Health check
app.get('/api/v1/health', (req, res) => {
  res.json({ status: 'ok', message: 'SchoolPro API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
