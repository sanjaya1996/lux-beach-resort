const express = require('express');

const ROOMS = require('./data/data');

const app = express();

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.get('/api/rooms', (req, res) => {
  res.json(ROOMS);
});

app.get('/api/rooms/:id', (req, res) => {
  const room = ROOMS.find((room) => room.id === req.params.id);
  res.json(room);
});

app.listen(5000, console.log('Server running on port 5000'));
