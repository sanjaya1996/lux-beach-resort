import {
  MEAL_ORDER_DETAILS_FAIL,
  MEAL_ORDER_DETAILS_REQUEST,
  MEAL_ORDER_DETAILS_SUCCESS,
  MEAL_ORDER_FAIL,
  MEAL_ORDER_LIST_FAIL,
  MEAL_ORDER_LIST_MY_FAIL,
  MEAL_ORDER_LIST_MY_REQUEST,
  MEAL_ORDER_LIST_MY_SUCCESS,
  MEAL_ORDER_LIST_REQUEST,
  MEAL_ORDER_LIST_SUCCESS,
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

export const mealOrderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case MEAL_ORDER_LIST_REQUEST:
      return { loading: true };
    case MEAL_ORDER_LIST_SUCCESS:
      return { loading: false, orders: action.payload };
    case MEAL_ORDER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const mealOrderListMyReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case MEAL_ORDER_LIST_MY_REQUEST:
      return { loading: true };
    case MEAL_ORDER_LIST_MY_SUCCESS:
      return { loading: false, orders: action.payload };
    case MEAL_ORDER_LIST_MY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const mealOrderDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case MEAL_ORDER_DETAILS_REQUEST:
      return { loading: true };
    case MEAL_ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload };
    case MEAL_ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
