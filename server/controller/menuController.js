const db = require('../config/db.js');

// @desc    Fetch all meals
// @route   GET /api/menu
// @access  Public
const getMeals = async (req, res, next) => {
  try {
    const response = await db.query('SELECT * FROM meals');
    res.json(response.rows);
  } catch (err) {
    next(err);
  }
};

// @desc    Fetch a single meal by id
// @route   GET /api/menu/:id
// @access  Public
const getMealById = async (req, res, next) => {
  try {
    const response = await db.query('SELECT * FROM meals WHERE id = $1', [
      req.params.id,
    ]);
    res.json(response.rows[0]);
  } catch (err) {
    next(err);
  }
};

// @desc    Delete a meal by Id
// @route   DELETE /api/menu/:id
// @access  Private/Admin
const deleteMeal = async (req, res, next) => {
  try {
    const results = await db.query(
      'DELETE FROM meals WHERE id = $1 RETURNING id;',
      [req.params.id]
    );

    if (results.rowCount || results.rows.length != 0) {
      res.json({ message: 'Meal Deleted Successfully' });
    } else {
      res.status(404);
      throw new Error('Meal Not found');
    }
  } catch (err) {
    next(err);
  }
};

// @desc    Create a new meal
// @route   POST /api/menu/:id
// @access  Private/Admin
const createMeal = async (req, res, next) => {
  try {
    const {
      name,
      category,
      price,
      imageUrl,
      duration,
      isGlutenFree,
      isVegan,
      isVegeterian,
      isLactoseFree,
      ingredients,
    } = req.body;

    const query = {
      text: `INSERT INTO meals 
                  (name , category, price, imageurl, duration, is_gluten_free, is_vegan, is_vegeterian, is_lactose_free, ingredients)
              VALUES 
                  ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *
              `,
      values: [
        name,
        category,
        price,
        imageUrl,
        duration,
        isGlutenFree,
        isVegan,
        isVegeterian,
        isLactoseFree,
        ingredients,
      ],
    };

    const results = await db.query(query);
    res.json(results.rows[0]);
  } catch (err) {
    next(err);
  }
};

// @desc    Update a meal by Id
// @route   PUT /api/menu/:id
// @access  Private/Admin
const updateMeal = async (req, res, next) => {
  try {
    const id = req.params.id;

    const existedMeal = await db.query('SELECT * FROM meals WHERE id = $1', [
      id,
    ]);

    if (existedMeal.rowCount === 1) {
      const meal = existedMeal.rows[0];

      let {
        name,
        category,
        price,
        imageUrl,
        duration,
        isGlutenFree,
        isVegan,
        isVegeterian,
        isLactoseFree,
        ingredients,
      } = req.body;

      name = name || meal.name;
      category = category || meal.category;
      price = price || meal.price;
      imageUrl = imageUrl || meal.imageurl;
      duration = duration || meal.duration;
      isGlutenFree =
        isGlutenFree === undefined ? meal.is_gluten_free : isGlutenFree;
      isVegan = isVegan === undefined ? meal.is_vegan : isVegan;
      isVegeterian =
        isVegeterian === undefined ? meal.is_vegeterian : isVegeterian;
      isLactoseFree =
        isLactoseFree === undefined ? meal.is_lactose_free : isLactoseFree;
      ingredients = ingredients || meal.ingredients;

      const query = {
        text: `UPDATE meals SET 
              name = $1, category= $2, price= $3, imageurl= $4, duration= $5, 
              is_gluten_free= $6, is_vegan= $7, is_vegeterian= $8, is_lactose_free= $9, ingredients= $10
           WHERE id = $11 RETURNING *`,
        values: [
          name,
          category,
          price,
          imageUrl,
          duration,
          isGlutenFree,
          isVegan,
          isVegeterian,
          isLactoseFree,
          ingredients,
          meal.id,
        ],
      };

      const results = await db.query(query);
      res.json(results.rows[0]);
    } else {
      res.status(404);
      throw new Error('Meal Not found');
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { getMeals, getMealById, deleteMeal, createMeal, updateMeal };
