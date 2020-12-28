const express = require('express');
const {
  getBookings,
  createBooking,
  getCurrentBookings,
  getMyBookings,
} = require('../controller/bookingController');
const { createGuest, updateProfile } = require('../controller/guestController');
const { checkAuth } = require('../middleware/authMiddleware');
const {
  emailBookingRequest,
  emailBookingConfirmed,
} = require('../middleware/emailBookingMiddleware');

const router = express.Router();

router.route('/').get(getBookings).post(emailBookingRequest);
router.get('/current', getCurrentBookings);
router.get('/mybookings', checkAuth, getMyBookings);
router.post('/:roomId', createGuest, createBooking);
router.post('/:roomId/:guestId', checkAuth, updateProfile, createBooking);
router.get(
  '/email-booking/:token',
  emailBookingConfirmed,
  createGuest,
  createBooking
);

module.exports = router;
