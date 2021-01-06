import {
  MEAL_DETAILS_FAIL,
  MEAL_DETAILS_REQUEST,
  MEAL_DETAILS_SUCCESS,
  MEAL_LIST_FAIL,
  MEAL_LIST_REQUEST,
  MEAL_LIST_SUCCESS,
} from '../actions/menu';

export const MEAL_LIST_FILTER = 'MEAL_LIST_FILTER';
export const MEAL_LIST_FILTER_RESET = 'MEAL_LIST_FILTER_RESET';

export const mealListReducer = (
  state = { meals: [], filteredMeals: [] },
  action
) => {
  switch (action.type) {
    case MEAL_LIST_REQUEST:
      return { loading: true };
    case MEAL_LIST_SUCCESS:
      return {
        loading: false,
        meals: action.payload,
        filteredMeals: action.payload,
      };
    case MEAL_LIST_FAIL:
      return { loading: false, error: action.payload };
    case MEAL_LIST_FILTER:
      let tempMeals = [...state.meals];
      const {
        category,
        price,
        maxPrice,
        vegan,
        vegeterian,
        glutenFree,
        lactoseFree,
      } = action.payload;

      if (category !== 'all') {
        tempMeals = tempMeals.filter((meal) => meal.category === category);
      }

      if (price < maxPrice) {
        tempMeals = tempMeals.filter(
          (meal) => Number(meal.price) <= Number(price)
        );
      }

      if (vegan) {
        tempMeals = tempMeals.filter((meal) => meal.is_vegan === true);
      }

      if (vegeterian) {
        tempMeals = tempMeals.filter((meal) => meal.is_vegeterian === true);
      }

      if (glutenFree) {
        tempMeals = tempMeals.filter((meal) => meal.is_gluten_free === true);
      }

      if (lactoseFree) {
        tempMeals = tempMeals.filter((meal) => meal.is_lactose_free === true);
      }

      return { ...state, filteredMeals: tempMeals };

    case MEAL_LIST_FILTER_RESET:
      return { ...state, filteredMeals: state.meals };
    default:
      return state;
  }
};

export const mealDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case MEAL_DETAILS_REQUEST:
      return { loading: true };
    case MEAL_DETAILS_SUCCESS:
      return { loading: false, meal: action.payload };
    case MEAL_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};