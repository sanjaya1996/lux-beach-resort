const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');

// Load config
dotenv.config();

const roomRoutes = require('./routes/roomRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const guestRoutes = require('./routes/guestRoutes');
const checkAvailabilityRoutes = require('./routes/checkAvailabilityRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Room routes
app.use('/api/rooms', roomRoutes);

// Booking routes
app.use('/api/bookings', bookingRoutes);

// Guest routes
app.use('/api/guests', guestRoutes);

// Check room availability
app.use('/api/checkavailability', checkAvailabilityRoutes);

// Payment
app.use('/api/payment', paymentRoutes);

// File upload routes
app.use('/api/upload', uploadRoutes);

// Make uploads folder static
app.use('/uploads', express.static('uploads'));
// app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
