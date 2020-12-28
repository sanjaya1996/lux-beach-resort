const db = require('../config/db.js');

// @desc    Fetch all guests
// @route   GET /api/guests
// @access  Public
const getGuests = async (req, res, next) => {
  try {
    const results = await db.query('SELECT * FROM guests');
    res.status(200).json(results.rows);
  } catch (err) {
    const newError = new Error(err);
    next(newError);
  }
};

const getProfile = async (req, res, next) => {
  try {
    const user = req.user;
    const results = await db.query('SELECT * FROM guests WHERE id = $1', [
      user.id,
    ]);
    res.json(results.rows[0]);
  } catch (err) {
    next(err);
  }
};

const createGuest = async (req, res, next) => {
  try {
    const { name, phone, email, title } = req.body;

    const query = {
      text:
        'INSERT INTO guests (name, phone, email, title) VALUES($1, $2, $3, $4) RETURNING id',
      values: [name, phone, email, title],
    };

    const results = await db.query(query);
    req.guestId = results.rows[0].id;
    next();
  } catch (err) {
    const newError = new Error(err);
    next(newError);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { phone, email, title } = req.body;

    const user = req.user;

    if (user.auth_provider_name === 'facebook') {
      user.email = email;
    }

    const query = {
      text:
        'UPDATE guests SET (phone, email, title) = ($1, $2, $3) WHERE id = $4 RETURNING *',
      values: [phone, user.email, title, user.id],
    };

    const results = await db.query(query);

    if (req.params.roomId) {
      req.guestId = results.rows[0].id;
      next();
      return;
    }

    res.json(results.rows[0]);
  } catch (err) {
    next(err);
  }
};

module.exports = { getGuests, createGuest, getProfile, updateProfile };
