import axios from 'axios';

export const GUEST_LIST_REQUEST = 'GUEST_LIST_REQUEST';
export const GUEST_LIST_SUCCESS = 'GUEST_LIST_SUCCESS';
export const GUEST_LIST_FAIL = 'GUEST_LIST_FAIL';

export const CURRENT_USER_REQUEST = 'CURRENT_USER_REQUEST';
export const CURRENT_USER_SUCCESS = 'CURRENT_USER_SUCCESS';
export const CURRENT_USER_FAIL = 'CURRENT_USER_FAIL';

export const USER_UPDATE_PROFILE_REQUEST = 'USER_UPDATE_PROFILE_REQUEST';
export const USER_UPDATE_PROFILE_SUCCESS = 'USER_UPDATE_PROFILE_SUCCESS';
export const USER_UPDATE_PROFILE_FAIL = 'USER_UPDATE_PROFILE_FAIL';

export const CURRENT_USER_UPDATE = 'CURRENT_USER_UPDATE';

export const listGuests = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: GUEST_LIST_REQUEST });

      const { data } = await axios.get('/api/guests');

      dispatch({ type: GUEST_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GUEST_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

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

export const updateUserProfile = (phone, email, title) => {
  return async (dispatch) => {
    try {
      dispatch({ type: USER_UPDATE_PROFILE_REQUEST });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.put(
        '/api/guests/profile',
        { phone, email, title },
        config
      );

      dispatch({ type: USER_UPDATE_PROFILE_SUCCESS });
      dispatch({ type: CURRENT_USER_UPDATE, payload: data });
    } catch (error) {
      dispatch({
        type: USER_UPDATE_PROFILE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};
