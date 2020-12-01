const express = require('express');

const db = require('../db/db.js');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const results = await db.query('select * from rooms');
    res.status(200).json(results.rows);
  } catch (err) {
    console.error(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const results = await db.query(
      `select * from rooms where id= ${req.params.id}`
    );
    res.status(200).json(results.rows[0]);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
