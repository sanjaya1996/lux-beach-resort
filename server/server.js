const express = require('express');
require('dotenv').config();

const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const cookieSession = require('cookie-session');

const passport = require('./config/passport');
const authRoutes = require('./routes/authRoutes');
const roomRoutes = require('./routes/roomRoutes');
const menuRoutes = require('./routes/menuRoutes');
const mealOrderRoutes = require('./routes/mealOrderRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const guestRoutes = require('./routes/guestRoutes');
const checkAvailabilityRoutes = require('./routes/checkAvailabilityRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();
app.use(express.json());

const corsConfig = {
  origin: process.env.ORIGIN_URI,
  credentials: true,
};

app.set('trust proxy', 1);

app.use(cors(corsConfig));
app.options('*', cors(corsConfig));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Cookie Session
app.use(
  cookieSession({
    name: 'mycookie session', // default is also session
    keys: [process.env.COOKIE_SECRET_KEY],
    maxAge: 24 * 60 * 60 * 1000,
    secure: process.env === 'production',
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

// Food-menu routes
app.use('/api/menu', menuRoutes);

// Food-orders routes
app.use('/api/mealorders', mealOrderRoutes);

// Check room availability
app.use('/api/checkavailability', checkAvailabilityRoutes);

// File upload routes
app.use('/api/upload', uploadRoutes);

// Make uploads folder static
app.use('/uploads', express.static(path.join(__dirname, './uploads')));

/*
// For fullstack deployment client+server together
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, '..', 'client', 'build', 'index.html')
    );
  });
} else {
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}
*/

app.get('/', (req, res) => {
  res.send('API is up and running...');
});

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
