const express = require('express');
const { checkAdmin } = require('../middleware/authMiddleware');
const {
  getMeals,
  getMealById,
  deleteMeal,
} = require('../controller/menuController');

const router = express.Router();

router.get('/', getMeals);
router.route('/:id').get(getMealById).delete(checkAdmin, deleteMeal);

module.exports = router;
