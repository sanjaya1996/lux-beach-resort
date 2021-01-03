const db = require('../config/db.js');

const getMeals = async (req, res, next) => {
  try {
    const response = await db.query('SELECT * FROM meals');
    res.json(response.rows);
  } catch (err) {
    next(err);
  }
};

module.exports = { getMeals };
