import {
  MEAL_ORDER_FAIL,
  MEAL_ORDER_REQUEST,
  MEAL_ORDER_SUCCESS,
} from '../actions/mealOrders';

export const MEAL_ORDER_RESET = 'MEAL_ORDER_RESET';

export const mealOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case MEAL_ORDER_REQUEST:
      return { loading: true };
    case MEAL_ORDER_SUCCESS:
      return { loading: false, success: true };
    case MEAL_ORDER_FAIL:
      return { loading: false, error: action.payload };
    case MEAL_ORDER_RESET:
      return {};
    default:
      return state;
  }
};
