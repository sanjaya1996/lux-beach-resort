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

// @desc    Create a booking
// @route   POST /api/bookings
// @access  Public
const createBooking = async (req, res, next) => {
  try {
    const guestId = req.guestId;
    const roomId = req.params.roomId;
    const { checkInDate, checkOutDate } = req.body;

    const query = {
      text:
        'INSERT INTO bookings (room_id, guest_id, checkin_date, checkout_date) VALUES($1, $2, $3, $4) RETURNING *',
      values: [roomId, guestId, checkInDate, checkOutDate],
    };

    const results = await db.query(query);

    await db.query('UPDATE rooms SET is_booked= true  WHERE id = $1;', [
      roomId,
    ]);

    res.status(201).json(results.rows[0]);
  } catch (err) {
    next(err);
  }
};

module.exports = { getBookings, createBooking };
