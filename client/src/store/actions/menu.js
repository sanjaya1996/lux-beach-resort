import axios from 'axios';

export const MEAL_LIST_REQUEST = 'MEAL_LIST_REQUEST';
export const MEAL_LIST_SUCCESS = 'MEAL_LIST_SUCCESS';
export const MEAL_LIST_FAIL = 'MEAL_LIST_FAIL';

export const MEAL_DETAILS_REQUEST = 'MEAL_DETAILS_REQUEST';
export const MEAL_DETAILS_SUCCESS = 'MEAL_DETAILS_SUCCESS';
export const MEAL_DETAILS_FAIL = 'MEAL_DETAILS_FAIL';

export const listMeal = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: MEAL_LIST_REQUEST });

      const { data } = await axios.get('/api/menu');

      dispatch({ type: MEAL_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: MEAL_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const listMealDetails = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: MEAL_DETAILS_REQUEST });

      const { data } = await axios.get(`/api/menu/${id}`);

      dispatch({ type: MEAL_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: MEAL_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};
