const express = require('express');
const {
  getBookings,
  createBooking,
  getCurrentBookings,
} = require('../controller/bookingController');
const { createGuest } = require('../controller/guestController');
const {
  emailBookingRequest,
  emailBookingConfirmed,
} = require('../middleware/emailBookingMiddleware');

const router = express.Router();

router.route('/').get(getBookings).post(emailBookingRequest);
router.get('/current', getCurrentBookings);
router.post('/:roomId', createGuest, createBooking);
router.get(
  '/email-booking/:token',
  emailBookingConfirmed,
  createGuest,
  createBooking
);

module.exports = router;
