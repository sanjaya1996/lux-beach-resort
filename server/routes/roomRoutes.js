const express = require('express');
const ROOMS = require('../data/data');

const router = express.Router();

router.get('/', (req, res) => {
  res.json(ROOMS);
});

router.get('/:id', (req, res) => {
  const room = ROOMS.find((room) => room.id === req.params.id);
  res.json(room);
});

module.exports = router;
