import axios from 'axios';

export const MEAL_LIST_REQUEST = 'MEAL_LIST_REQUEST';
export const MEAL_LIST_SUCCESS = 'MEAL_LIST_SUCCESS';
export const MEAL_LIST_FAIL = 'MEAL_LIST_FAIL';

export const MEAL_DETAILS_REQUEST = 'MEAL_DETAILS_REQUEST';
export const MEAL_DETAILS_SUCCESS = 'MEAL_DETAILS_SUCCESS';
export const MEAL_DETAILS_FAIL = 'MEAL_DETAILS_FAIL';

export const MEAL_DELETE_REQUEST = 'MEAL_DELETE_REQUEST';
export const MEAL_DELETE_SUCCESS = 'MEAL_DELETE_SUCCESS';
export const MEAL_DELETE_FAIL = 'MEAL_DELETE_FAIL';

export const MEAL_CREATE_REQUEST = 'MEAL_CREATE_REQUEST';
export const MEAL_CREATE_SUCCESS = 'MEAL_CREATE_SUCCESS';
export const MEAL_CREATE_FAIL = 'MEAL_CREATE_FAIL';

export const MEAL_UPDATE_REQUEST = 'MEAL_UPDATE_REQUEST';
export const MEAL_UPDATE_SUCCESS = 'MEAL_UPDATE_SUCCESS';
export const MEAL_UPDATE_FAIL = 'MEAL_UPDATE_FAIL';

const API_URI = process.env.REACT_APP_API_URI;

export const listMeals = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: MEAL_LIST_REQUEST });

      const { data } = await axios.get(`${API_URI}/api/menu`);

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

      const { data } = await axios.get(`${API_URI}/api/menu/${id}`);

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

export const deleteMeal = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: MEAL_DELETE_REQUEST });

      const config = { withCredentials: true };

      await axios.delete(`${API_URI}/api/menu/${id}`, config);

      dispatch({ type: MEAL_DELETE_SUCCESS });
    } catch (error) {
      dispatch({
        type: MEAL_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const createMeal = (meal) => {
  return async (dispatch) => {
    try {
      dispatch({ type: MEAL_CREATE_REQUEST });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      };

      const { data } = await axios.post(`${API_URI}/api/menu`, meal, config);

      dispatch({ type: MEAL_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: MEAL_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const updateMeal = (meal) => {
  return async (dispatch) => {
    try {
      dispatch({ type: MEAL_UPDATE_REQUEST });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      };

      const { data } = await axios.put(
        `${API_URI}/api/menu/${meal.id}`,
        meal,
        config
      );

      dispatch({ type: MEAL_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: MEAL_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};
