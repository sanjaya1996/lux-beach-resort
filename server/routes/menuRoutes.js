const express = require('express');
const { getMeals } = require('../controller/menuController');

const router = express.Router();

router.get('/', getMeals);

module.exports = router;
