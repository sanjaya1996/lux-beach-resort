const db = require('../config/db.js');

// @desc    Fetch all bookings
// @route   GET /api/bookings
// @access  Public
const getBookings = async (req, res) => {
  try {
    const results = await db.query('SELECT * FROM bookings');
    res.status(200).json(results.rows);
  } catch (err) {
    next(err);
  }
};

module.exports = { getBookings };
