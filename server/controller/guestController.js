const db = require('../config/db.js');

// @desc    Fetch all guests
// @route   GET /api/guests
// @access  Public
const getGuests = async (req, res) => {
  try {
    const results = await db.query('SELECT * FROM guests');
    res.status(200).json(results.rows);
  } catch (err) {
    const newError = new Error(err);
    next(newError);
  }
};

const createGuest = async (req, res, next) => {
  try {
    const { name, phone, email } = req.body;

    const query = {
      text:
        'INSERT INTO guests (name, phone, email) VALUES($1, $2, $3) RETURNING id',
      values: [name, phone, email],
    };

    const results = await db.query(query);
    req.guestId = results.rows[0].id;
    next();
  } catch (err) {
    const newError = new Error(err);
    next(newError);
  }
};

module.exports = { getGuests, createGuest };
