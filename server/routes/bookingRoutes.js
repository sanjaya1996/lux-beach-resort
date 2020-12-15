const express = require('express');
const {
  getBookings,
  createBooking,
  getCurrentBookings,
} = require('../controller/bookingController');
const { createGuest } = require('../controller/guestController');
const { confirmEmailLink } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getBookings);
router.get('/current', getCurrentBookings);
router.post('/:roomId', createGuest, createBooking);
router.get('/confirm', confirmEmailLink, createGuest, createBooking);

module.exports = router;
