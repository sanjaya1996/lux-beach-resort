const db = require('../config/db.js');

// @desc    Fetch all meals
// @route   GET /api/menu
// @access  Public
const getMeals = async (req, res, next) => {
  try {
    const response = await db.query('SELECT * FROM meals');
    res.json(response.rows);
  } catch (err) {
    next(err);
  }
};

// @desc    Fetch a single meal by id
// @route   GET /api/menu/:id
// @access  Public
const getMealById = async (req, res, next) => {
  try {
    const response = await db.query('SELECT * FROM meals WHERE id = $1', [
      req.params.id,
    ]);
    res.json(response.rows[0]);
  } catch (err) {
    next(err);
  }
};

module.exports = { getMeals, getMealById };
