const express = require('express');
const mysql = require('mysql');

const ROOMS = require('./data/data');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'luxbeachresort',
});

// Connect
db.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log('Mysql Connected...');
});

const app = express();

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Create DB
app.get('/createdb', (req, res) => {
  let sql = 'CREATE DATABASE luxBeachResort';
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Database Created');
  });
});

app.get('/api/rooms', (req, res) => {
  res.json(ROOMS);
});

app.get('/api/rooms/:id', (req, res) => {
  const room = ROOMS.find((room) => room.id === req.params.id);
  res.json(room);
});

app.listen(5000, console.log('Server running on port 5000'));
