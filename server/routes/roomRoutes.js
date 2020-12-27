const express = require('express');

const {
  getRooms,
  getRoomById,
  createRoom,
  deleteRoom,
  updateRoom,
} = require('../controller/roomController');

const { checkAdmin, checkAuth } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').get(getRooms).post(checkAdmin, createRoom);

router
  .route('/:id')
  .get(getRoomById)
  .delete(checkAdmin, deleteRoom)
  .put(checkAdmin, updateRoom);

module.exports = router;
