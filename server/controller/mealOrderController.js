const db = require('../config/db.js');

// @desc    Fetch all food orders
// @route   GET /api/mealorders
// @access  Private/Admin
const getMealOrders = async (req, res, next) => {
  try {
    const { rows: orders } = await db.query(
      `SELECT orders.*, guests.name AS guest_name
      FROM orders
      JOIN guests ON orders.guest_id = guests.id;
      `
    );

    res.json(orders);
  } catch (err) {
    next(err);
  }
};

// @desc    Get order by Id
// @route   GET /api/mealorders/:id
// @access  Private
const getMealOrderById = async (req, res, next) => {
  try {
    const user = req.user;

    const { rows } = await db.query(
      `
        SELECT orders.*, guests.name AS guest_name, guests.email AS guest_email, guests.phone AS guest_phone 
        FROM orders 
        JOIN guests ON orders.guest_id = guests.id
        WHERE id = $1
      `,
      [req.params.id]
    );

    const order = rows[0];

    if (rows.length === 0 || (!user.is_admin && order.guest_id !== user.id)) {
      res.status(404);
      throw new Error('Order not found');
    } else {
      const { rows: meals_orders } = await db.query(
        `
          SELECT meal_id, quantity , meals.name AS meal_name, meals.imageurl FROM meals_orders
          JOIN meals ON meals_orders.meal_id = meals.id
          WHERE order_id = $1;
        `,
        [req.params.id]
      );

      order.meals = meals_orders.map(
        ({ order_id, ...otherValues }) => otherValues
      );

      res.json(order);
    }
  } catch (err) {
    next(err);
  }
};

// @desc    Get logged in user Orders
// @route   GET /api/mealorders/my
// @access  Private
const getMyOrders = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const {
      rows: orders,
    } = await db.query(
      'SELECT id, total_amount, is_paid, ordered_at, is_pickedup FROM orders WHERE guest_id = $1',
      [userId]
    );

    const { rows: meals_orders } = await db.query(
      `
        SELECT meals_orders.* , meals.name AS meal_name FROM meals_orders
        JOIN meals ON meals_orders.meal_id = meals.id
        WHERE order_id IN (
          SELECT id FROM orders WHERE guest_id = $1
        );
      `,
      [userId]
    );

    orders.forEach((order) => {
      const mealsOfOrder = meals_orders.filter((m) => m.order_id === order.id);
      order.meals = mealsOfOrder.map(
        ({ order_id, ...otherValues }) => otherValues
      );
    });

    res.json(orders);
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

module.exports = {
  getMealOrders,
  getMealOrderById,
  getMyOrders,
  createMealOrder,
};
