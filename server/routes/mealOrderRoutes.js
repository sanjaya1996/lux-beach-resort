const express = require('express');
const {
  createMealOrder,
  getMealOrders,
  getMealOrderById,
  getMyOrders,
  updateOrderToPicked,
} = require('../controller/mealOrderController');
const { updateProfile, createGuest } = require('../controller/guestController');
const makePayment = require('../middleware/paymentMiddleware');
const { checkAuth, checkAdmin } = require('../middleware/authMiddleware');

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

router
  .route('/')
  .get(checkAdmin, getMealOrders)
  .post(makePayment, createOrUpdateGuest, createMealOrder);

router.get('/myorders', checkAuth, getMyOrders);

router.get('/:id', checkAuth, getMealOrderById);

router.put('/:id/picked', checkAdmin, updateOrderToPicked);

module.exports = router;
