const express = require('express');
const { createMealOrder } = require('../controller/mealOrderController');
const { updateProfile, createGuest } = require('../controller/guestController');
const makePayment = require('../middleware/paymentMiddleware');

const router = express.Router();

// Create user if not authenticated or update user if authenticated, before Placing order
const createOrUpdateGuest = (req, res, next) => {
  req.type = 'mealOrder';

  if (req.isAuthenticated()) {
    updateProfile(req, res, next);
  } else {
    createGuest(req, res, next);
  }
};

router.post('/', makePayment, createOrUpdateGuest, createMealOrder);

module.exports = router;
