const express = require('express');
const { createMealOrder } = require('../controller/mealOrderController');

const router = express.Router();

router.post('/', createMealOrder);

module.exports = router;
