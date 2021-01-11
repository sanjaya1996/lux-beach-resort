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

// @desc    Fetch a single guest by Id
// @route   GET /api/guests/:id
// @access  Admin only
const getGuestById = async (req, res, next) => {
  try {
    const results = await db.query('SELECT * FROM guests WHERE id = $1', [
      req.params.id,
    ]);

    if (results.rows.length === 0) {
      res.status(404);
      throw new Error('Guest not found');
    }

    res.json(results.rows[0]);
  } catch (err) {
    const newError = new Error(err);
    next(newError);
  }
};

// @desc    Update gues
// @route   PUT /api/guests/:id
// @access  Private/Admin
const updateGuest = async (req, res, next) => {
  try {
    const guestResults = await db.query('SELECT * FROM guests WHERE id = $1', [
      req.params.id,
    ]);

    if (guestResults.rows.length === 0) {
      res.status(404);
      throw new Error('Guest not found');
    }

    const guest = guestResults.rows[0];

    let { email, phone, title, isAdmin } = req.body;

    email =
      guest.auth_provider_name === 'google' || !email ? guest.email : email;
    phone = phone || guest.phone;
    title = title || guest.title;
    isAdmin = isAdmin === undefined ? guest.isAdmin : isAdmin;

    const query = {
      text: `UPDATE guests SET (phone, email, title, is_admin) = ($1, $2, $3, $4) 
             WHERE id = $5 RETURNING *`,
      values: [phone, email, title, isAdmin, user.id],
    };

    const results = await db.query(query);

    res.json(results.rows[0]);
  } catch (err) {
    next(err);
  }
};

// @desc    Delete a guest by Id
// @route   DELETE /api/guests/:id
// @access  Private/Admin
const deleteGuest = async (req, res, next) => {
  try {
    const results = await db.query(
      'DELETE FROM guests WHERE id = $1 RETURNING id;',
      [req.params.id]
    );

    if (results.rowCount || results.rows.length != 0) {
      res.json({ message: 'Guest Deleted Successfully' });
    } else {
      res.status(404);
      throw new Error('Guest Not found');
    }
  } catch (err) {
    next(err);
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
    let name;
    let phone;
    let email;
    let title;

    if (req.params.roomId) {
      const {
        bookingDetails: { guestDetails },
      } = req.body;
      name = guestDetails.name;
      phone = guestDetails.phone;
      email = guestDetails.email;
      title = guestDetails.title;
    } else if (req.type === 'mealOrder') {
      const { customer } = req.body;
      name = customer.name;
      phone = customer.phone;
      email = customer.email;
      title = customer.title;
    } else {
      name = req.body.name;
      phone = req.body.phone;
      email = req.body.email;
      title = req.body.title;
    }

    const query = {
      text:
        'INSERT INTO guests (name, phone, email, title) VALUES($1, $2, $3, $4) RETURNING id',
      values: [name, phone, email, title],
    };

    const results = await db.query(query);

    if (req.params.roomId || req.type === 'mealOrder') {
      req.guestId = results.rows[0].id;
      next();
      return;
    }

    res.json(results.rows[0]);
  } catch (err) {
    const newError = new Error(err);
    next(newError);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    let phone;
    let email;
    let title;

    if (req.params.roomId) {
      const {
        bookingDetails: { guestDetails },
      } = req.body;
      phone = guestDetails.phone;
      email = guestDetails.email;
      title = guestDetails.title;
    } else if (req.type === 'mealOrder') {
      const { customer } = req.body;
      phone = customer.phone;
      email = customer.email;
      title = customer.title;
    } else {
      phone = req.body.phone;
      email = req.body.email;
      title = req.body.title;
    }

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

    if (req.params.roomId || req.type === 'mealOrder') {
      next();
      return;
    }

    res.json(results.rows[0]);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getGuests,
  getGuestById,
  updateGuest,
  deleteGuest,
  createGuest,
  getProfile,
  updateProfile,
};
