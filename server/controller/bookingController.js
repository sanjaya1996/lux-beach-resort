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

// @desc    Get bookings by joining Guest
// @route   GET /api/bookings/:id
// @access  Private / Admin
const getAdminBookingList = async (req, res, next) => {
  try {
    const results = await db.query(
      `SELECT bookings.id , bookings.checkin_date, bookings.checkout_date, bookings.total_amount, bookings.is_paid, bookings.paid_at, bookings.vacated, guests.name AS guest_name
        FROM bookings
        JOIN guests ON bookings.guest_id = guests.id;`
    );

    res.json(results.rows);
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
    const results = await db.query(
      `SELECT bookings.* , rooms.name as room_name, rooms.type as room_type, rooms.price as room_price
        FROM bookings
        JOIN rooms ON bookings.room_id = rooms.id
        WHERE bookings.id = $1;`,
      [req.params.id]
    );

    if (
      results.rows.length === 0 ||
      (!user.is_admin && results.rows[0].guest_id !== user.id)
    ) {
      res.status(404);
      throw new Error('Booking not found');
    } else {
      res.json(results.rows[0]);
    }
  } catch (err) {
    next(err);
  }
};

// @desc    Update booking to Paid
// @route   PUT /api/bookings/:bookingId/payment
// @access  Private
const updateBookingToPaid = async (req, res, next) => {
  try {
    const results = await db.query(
      'UPDATE bookings SET is_paid = true, paid_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *',
      [req.params.bookingId]
    );

    const roomId = results.rows[0].room_id;

    await db.query('UPDATE rooms SET is_booked= true  WHERE id = $1;', [
      roomId,
    ]);

    res.json({ message: 'Booking Updated to paid' });
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
  getAdminBookingList,
  getCurrentBookings,
  getMyBookings,
  getBookingById,
  updateBookingToPaid,
  createBooking,
};
