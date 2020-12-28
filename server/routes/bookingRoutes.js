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
const makePayment = require('../middleware/paymentMiddleware');

const router = express.Router();

const createOrUpdateGuest = (req, res, next) => {
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {
    console.log('updateProfile function');
    updateProfile(req, res, next);
  } else {
    console.log('createGuest function');
    createGuest(req, res, next);
  }
};

router.route('/').get(getBookings).post(emailBookingRequest);
router.get('/current', getCurrentBookings);
router.get('/mybookings', checkAuth, getMyBookings);
router.post('/pay/:roomId', makePayment, createOrUpdateGuest, createBooking);
// router.post('/:roomId', createGuest, createBooking);
// router.post('/:roomId/:guestId', checkAuth, updateProfile, createBooking);
router.get(
  '/email-booking/:token',
  emailBookingConfirmed,
  createGuest,
  createBooking
);

module.exports = router;
