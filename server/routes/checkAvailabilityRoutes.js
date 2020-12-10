const express = require('express');

const db = require('../config/db.js');

const router = express.Router();

router.get('/:id', async (req, res, next) => {
  try {
    const { checkin, checkout, guests } = req.query;

    const roomResponse = await db.query('SELECT * FROM rooms WHERE id= $1', [
      req.params.id,
    ]);
    const room = roomResponse.rows[0];

    if (room.is_booked) {
      if (checkin >= checkout) {
        res.json({
          bookingAvailable: false,
          message: 'Check-out date must be greater than Check-in date',
        });
      } else if (guests > room.capacity) {
        res.json({
          bookingAvailable: false,
          message: `Room capacity is ${room.capacity} people`,
        });
      } else {
        // 'SELECT * FROM bookings WHERE room_id = $1 AND (($2 >= checkin_date AND $2 < checkout_date) OR ($3 > checkin_date AND $3 <= checkout_date ) OR ($2 < checkin_date AND $3 > checkout_date) )',
        const bookingsResponse = await db.query(
          `SELECT * FROM bookings WHERE room_id = $1 
          AND (
                ($2 >= checkin_date AND $2 < checkout_date)
                 OR ($3 > checkin_date AND $3 <= checkout_date) 
                 OR ($2 <= checkin_date AND $3 >= checkout_date)
             );`,
          [req.params.id, checkin, checkout]
        );
        if (bookingsResponse.rowCount === 0) {
          res.json({ bookingAvailable: true });
        } else {
          res.json({
            bookingAvailable: false,
            message: 'Not available for these days',
          });
        }
      }
    } else {
      res.json({ bookingAvailable: true });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
