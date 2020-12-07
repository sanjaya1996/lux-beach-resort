const express = require('express');
const {
  getBookings,
  createBooking,
} = require('../controller/bookingController');
const { createGuest } = require('../controller/guestController');

const router = express.Router();

router.get('/', getBookings);
router.post('/:roomId', createGuest, createBooking);

module.exports = router;
