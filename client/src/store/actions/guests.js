import axios from 'axios';

export const CURRENT_USER_REQUEST = 'CURRENT_USER_REQUEST';
export const CURRENT_USER_SUCCESS = 'CURRENT_USER_SUCCESS';
export const CURRENT_USER_FAIL = 'CURRENT_USER_FAIL';

export const getCurrentUser = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: CURRENT_USER_REQUEST });

      const { data } = await axios.get('/api/auth/currentuser');

      dispatch({ type: CURRENT_USER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: CURRENT_USER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};
