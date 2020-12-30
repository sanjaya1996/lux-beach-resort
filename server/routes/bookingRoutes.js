const express = require('express');
const {
  getBookings,
  createBooking,
  getCurrentBookings,
  getMyBookings,
  getBookingById,
  updateBookingToPaid,
  getAdminBookingList,
} = require('../controller/bookingController');
const { createGuest, updateProfile } = require('../controller/guestController');
const { checkAuth, checkAdmin } = require('../middleware/authMiddleware');
const {
  emailBookingRequest,
  emailBookingConfirmed,
} = require('../middleware/emailBookingMiddleware');
const makePayment = require('../middleware/paymentMiddleware');

const router = express.Router();

const createOrUpdateGuest = (req, res, next) => {
  if (req.isAuthenticated()) {
    updateProfile(req, res, next);
  } else {
    createGuest(req, res, next);
  }
};

router.route('/').get(getBookings).post(emailBookingRequest);
router.get('/current', getCurrentBookings);
router.get('/adminbookinglist', checkAdmin, getAdminBookingList);
router.get('/mybookings', checkAuth, getMyBookings);
router.get('/:id', checkAuth, getBookingById);
router.post('/pay/:roomId', makePayment, createOrUpdateGuest, createBooking);
router.put('/:bookingId/payment', checkAuth, makePayment, updateBookingToPaid);
// router.post('/:roomId', createGuest, createBooking);
// router.post('/:roomId/:guestId', checkAuth, updateProfile, createBooking);
router.get(
  '/email-booking/:token',
  emailBookingConfirmed,
  createGuest,
  createBooking
);

module.exports = router;
