const express = require('express');
const { checkAdmin } = require('../middleware/authMiddleware');
const {
  getMeals,
  getMealById,
  deleteMeal,
  updateMeal,
  createMeal,
} = require('../controller/menuController');

const router = express.Router();

router.route('/').get(getMeals).post(checkAdmin, createMeal);
router
  .route('/:id')
  .get(getMealById)
  .delete(checkAdmin, deleteMeal)
  .put(checkAdmin, updateMeal);

module.exports = router;
