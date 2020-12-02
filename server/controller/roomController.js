const db = require('../config/db.js');

// @desc    Fetch all rooms
// @route   GET /api/rooms
// @access  Public
const getRooms = async (req, res) => {
  try {
    const results = await db.query('select * from rooms');
    res.status(200).json(results.rows);
  } catch (err) {
    next(err);
  }
};

// @desc    Fetch a single room
// @route   GET /api/rooms/:id
// @access  Public
const getRoomById = async (req, res, next) => {
  try {
    const results = await db.query('SELECT * FROM rooms WHERE id = $1', [
      req.params.id,
    ]);
    const room = results.rows[0];

    if (room) {
      res.json(room);
    } else {
      res.status(404);
      throw new Error('Room Not Found');
    }
  } catch (err) {
    next(err);
  }
};

// @desc    Create a room
// @route   POST /api/rooms
// @access  Private/Admin
const createRoom = async (req, res, next) => {
  try {
    const {
      name,
      type,
      price,
      size,
      capacity,
      pets,
      breakfast,
      featured,
      description,
      extras,
      images,
    } = req.body;

    const query = {
      text:
        'INSERT INTO rooms (name, type, price, size, capacity, pets, breakfast, featured, description, extras, images) VALUES($1, $2, $3, $4, $5, $6,$7, $8, $9, $10, $11 ) RETURNING *',
      values: [
        name,
        type,
        price,
        size,
        capacity,
        pets,
        breakfast,
        featured,
        description,
        extras,
        images,
      ],
    };

    const results = await db.query(query);
    res.json(results.rows[0]);
  } catch (err) {
    next(err);
  }
};

// @desc    Update a room by Id
// @route   PUT /api/rooms/:id
// @access  Private/Admin
const updateRoom = async (req, res, next) => {
  try {
    const id = req.params.id;
    const {
      name,
      type,
      price,
      size,
      capacity,
      pets,
      breakfast,
      featured,
      description,
      extras,
      images,
    } = req.body;

    const query = {
      text:
        'UPDATE rooms SET name = $1, type = $2, price = $3, size = $4, capacity = $5, pets = $6, breakfast = $7, featured = $8, description = $9, extras = $10, images = $11 WHERE id = $12 RETURNING *',
      values: [
        name,
        type,
        price,
        size,
        capacity,
        pets,
        breakfast,
        featured,
        description,
        extras,
        images,
        id,
      ],
    };

    const results = await db.query(query);

    if (results.rowCount || results.rows.length != 0) {
      res.json(results.rows[0]);
    } else {
      res.status(404);
      throw new Error('Room Not found');
    }
  } catch (err) {
    next(err);
  }
};

// @desc    Delete a room by Id
// @route   DELETE /api/rooms/:id
// @access  Private/Admin
const deleteRoom = async (req, res, next) => {
  try {
    const results = await db.query(
      'DELETE FROM rooms WHERE id = $1 RETURNING id;',
      [req.params.id]
    );

    if (results.rowCount || results.rows.length != 0) {
      res.json({ message: 'Room Deleted Successfully' });
    } else {
      res.status(404);
      throw new Error('Room Not found');
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { getRooms, getRoomById, createRoom, updateRoom, deleteRoom };
