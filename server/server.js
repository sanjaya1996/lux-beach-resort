const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');
const passport = require('passport');
const session = require('express-session');

// Load config
dotenv.config();

const authRoutes = require('./routes/authRoutes');
const roomRoutes = require('./routes/roomRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const guestRoutes = require('./routes/guestRoutes');
const checkAvailabilityRoutes = require('./routes/checkAvailabilityRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
// Passport config
require('./config/passport')(passport);

const app = express();

app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Sessions
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Auth routes
app.use('/api/auth', authRoutes);
// Room routes
app.use('/api/rooms', roomRoutes);

// Booking routes
app.use('/api/bookings', bookingRoutes);

// Guest routes
app.use('/api/guests', guestRoutes);

// Check room availability
app.use('/api/checkavailability', checkAvailabilityRoutes);

// Payment Routes
app.use('/api/payment', paymentRoutes);

// File upload routes
app.use('/api/upload', uploadRoutes);

// Make uploads folder static
app.use('/uploads', express.static('uploads'));
// app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
