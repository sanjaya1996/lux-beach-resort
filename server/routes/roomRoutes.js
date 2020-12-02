const express = require('express');

const {
  getRooms,
  getRoomById,
  createRoom,
  deleteRoom,
  updateRoom,
} = require('../controller/roomController');

const router = express.Router();

router.route('/').get(getRooms).post(createRoom);

router.route('/:id').get(getRoomById).delete(deleteRoom).put(updateRoom);

module.exports = router;
