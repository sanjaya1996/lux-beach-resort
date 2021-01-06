const db = require('../config/db.js');
const format = require('pg-format');

// @desc    Fetch all food orders
// @route   GET /api/mealorders
// @access  Private/Admin
const getMealOrders = async (req, res, next) => {
  try {
    const results = await db.query('SELECT * FROM meal_orders');
    res.status(200).json(results.rows);
  } catch (err) {
    next(err);
  }
};

// @desc    Create Order
// @route   POST /api/mealorders
// @access  Private
const createMealOrder = async (req, res, next) => {
  try {
    let userId;
    if (req.isAuthenticated()) {
      userId = req.user.id;
    } else {
      userId = req.guestId;
    }

    const { meals, pickupTime, pickupNote, amount } = req.body;
    const isPaid = req.is_paid;

    const insertOrderquery = {
      text:
        'INSERT INTO orders (guest_id, pickup_time, pickup_note, total_amount, is_paid) VALUES($1, $2, $3, $4, $5) RETURNING id',
      values: [userId, pickupTime, pickupNote, amount, isPaid],
    };

    const results = await db.query(insertOrderquery);

    const orderId = results.rows[0].id;

    let ordersMealsValue = [];

    meals.forEach((meal) => {
      ordersMealsValue.push([orderId, meal.id, meal.qty]);
    });

    const insertOrdersMealsQuery = format(
      'INSERT INTO meals_orders (order_id, meal_id, quantity) VALUES %L',
      ordersMealsValue
    );

    const insertOrdersMealsResults = await db.query(insertOrdersMealsQuery);

    res.status(201).json(insertOrdersMealsResults.rows);
  } catch (err) {
    next(err);
  }
};

module.exports = { getMealOrders, createMealOrder };
