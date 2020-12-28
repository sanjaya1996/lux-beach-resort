const db = require('../config/db.js');

// @desc    Fetch all bookings
// @route   GET /api/bookings
// @access  Public
const getBookings = async (req, res, next) => {
  try {
    const results = await db.query('SELECT * FROM bookings');
    res.status(200).json(results.rows);
  } catch (err) {
    next(err);
  }
};

// @desc    Fetch current bookings
// @route   GET /api/bookings/current
// @access  Public
const getCurrentBookings = async (req, res, next) => {
  try {
    const results = await db.query(
      'SELECT * FROM bookings WHERE vacated= false'
    );
    res.status(200).json(results.rows);
  } catch (err) {
    next(err);
  }
};

// @desc    Get logged in user bookings
// @route   GET /api/bookings/mybookings
// @access  Private
const getMyBookings = async (req, res, next) => {
  try {
    const user = req.user;
    const results = await db.query(
      'SELECT * FROM bookings WHERE guest_id = $1',
      [user.id]
    );

    res.json(results.rows);
  } catch (err) {
    next(err);
  }
};

// @desc    Get booking by id
// @route   GET /api/bookings/:id
// @access  Private
const getBookingById = async (req, res, next) => {
  try {
    const user = req.user;
    const results = await db.query('SELECT * FROM bookings WHERE id = $1', [
      req.params.id,
    ]);

    if (results.rows.length === 0 || results.rows[0].guest_id !== user.id) {
      const error = new Error('Booking not found');
      res.status(404);
      next(error);
    } else {
      res.json(results.rows);
    }
  } catch (err) {
    next(err);
  }
};

// @desc    Create a booking
// @route   POST /api/bookings
// @access  Public
const createBooking = async (req, res, next) => {
  try {
    const guestId = req.guestId || req.user.id;
    const roomId = req.params.roomId;
    const isPaid = req.is_paid || false;
    let {
      bookingDetails: { checkInDate, checkOutDate },
    } = req.body;

    checkInDate = new Date(checkInDate);
    checkOutDate = new Date(checkOutDate);

    const query = {
      text:
        'INSERT INTO bookings (room_id, guest_id, checkin_date, checkout_date, is_paid) VALUES($1, $2, $3, $4, $5) RETURNING *',
      values: [roomId, guestId, checkInDate, checkOutDate, isPaid],
    };

    const results = await db.query(query);

    if (isPaid) {
      await db.query('UPDATE rooms SET is_booked= true  WHERE id = $1;', [
        roomId,
      ]);
    }

    if (req.type && req.type === 'email-booking') {
      const title = 'Successfully booked!';
      const message =
        'We have reserved your room for you. Go ahead and complete your payment before someone takes your room.';
      res.redirect(`/success/${title}/${message}`);
      return;
    }

    // res.status(201).json(results.rows[0]);
    res.status(201).json({ message: 'room has been booked' });
  } catch (err) {
    const newError = new Error(err);
    next(newError);
  }
};

module.exports = {
  getBookings,
  getCurrentBookings,
  getMyBookings,
  getBookingById,
  createBooking,
};
