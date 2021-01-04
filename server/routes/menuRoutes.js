const express = require('express');
const { getMeals, getMealById } = require('../controller/menuController');

const router = express.Router();

router.get('/', getMeals);
router.get('/:id', getMealById);

module.exports = router;
