import axios from 'axios';

export const MEAL_ORDER_LIST_REQUEST = 'MEAL_ORDER_LIST_REQUEST';
export const MEAL_ORDER_LIST_SUCCESS = 'MEAL_ORDER_LIST_SUCCESS';
export const MEAL_ORDER_LIST_FAIL = 'MEAL_ORDER_LIST_FAIL';

export const MEAL_ORDER_LIST_MY_REQUEST = 'MEAL_ORDER_LIST_MY_REQUEST';
export const MEAL_ORDER_LIST_MY_SUCCESS = 'MEAL_ORDER_LIST_MY_SUCCESS';
export const MEAL_ORDER_LIST_MY_FAIL = 'MEAL_ORDER_LIST_MY_FAIL';

export const MEAL_ORDER_DETAILS_REQUEST = 'MEAL_ORDER_DETAILS_REQUEST';
export const MEAL_ORDER_DETAILS_SUCCESS = 'MEAL_ORDER_DETAILS_SUCCESS';
export const MEAL_ORDER_DETAILS_FAIL = 'MEAL_ORDER_DETAILS_FAIL';

export const MEAL_ORDER_REQUEST = 'MEAL_ORDER_REQUEST';
export const MEAL_ORDER_SUCCESS = 'MEAL_ORDER_SUCCESS';
export const MEAL_ORDER_FAIL = 'MEAL_ORDER_FAIL';

export const listMealOrders = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: MEAL_ORDER_LIST_REQUEST });

      const { data } = await axios.get('/api/mealorders');

      dispatch({ type: MEAL_ORDER_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: MEAL_ORDER_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const listMyMealOrders = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: MEAL_ORDER_LIST_MY_REQUEST });

      const { data } = await axios.get('/api/mealorders/myorders');

      dispatch({ type: MEAL_ORDER_LIST_MY_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: MEAL_ORDER_LIST_MY_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const getMealOrderDetails = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: MEAL_ORDER_DETAILS_REQUEST });

      const { data } = await axios.get(`/api/mealorders/${id}`);

      dispatch({ type: MEAL_ORDER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: MEAL_ORDER_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const orderMeal = (
  token,
  total,
  meals,
  pickupTime,
  pickupNote,
  customer
) => {
  return async (dispatch) => {
    try {
      dispatch({ type: MEAL_ORDER_REQUEST });

      const body = {
        token,
        amount: total,
        paymentDescription: `Food Order payment by ${customer.name}`,
        meals,
        pickupTime,
        pickupNote,
        customer,
      };

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      await axios.post('/api/mealorders', body, config);

      dispatch({ type: MEAL_ORDER_SUCCESS });
    } catch (error) {
      dispatch({
        type: MEAL_ORDER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};
