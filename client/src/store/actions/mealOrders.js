import axios from 'axios';

export const MEAL_ORDER_REQUEST = 'MEAL_ORDER_REQUEST';
export const MEAL_ORDER_SUCCESS = 'MEAL_ORDER_SUCCESS';
export const MEAL_ORDER_FAIL = 'MEAL_ORDER_FAIL';

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
