import axios from 'axios';

export const GUEST_LIST_REQUEST = 'GUEST_LIST_REQUEST';
export const GUEST_LIST_SUCCESS = 'GUEST_LIST_SUCCESS';
export const GUEST_LIST_FAIL = 'GUEST_LIST_FAIL';

export const GUEST_DETAILS_REQUEST = 'GUEST_DETAILS_REQUEST';
export const GUEST_DETAILS_SUCCESS = 'GUEST_DETAILS_SUCCESS';
export const GUEST_DETAILS_FAIL = 'GUEST_DETAILS_FAIL';

export const GUEST_DELETE_REQUEST = 'GUEST_DELETE_REQUEST';
export const GUEST_DELETE_SUCCESS = 'GUEST_DELETE_SUCCESS';
export const GUEST_DELETE_FAIL = 'GUEST_DELETE_FAIL';

export const GUEST_UPDATE_REQUEST = 'GUEST_UPDATE_REQUEST';
export const GUEST_UPDATE_SUCCESS = 'GUEST_UPDATE_SUCCESS';
export const GUEST_UPDATE_FAIL = 'GUEST_UPDATE_FAIL';

export const CURRENT_USER_REQUEST = 'CURRENT_USER_REQUEST';
export const CURRENT_USER_SUCCESS = 'CURRENT_USER_SUCCESS';
export const CURRENT_USER_FAIL = 'CURRENT_USER_FAIL';

export const USER_UPDATE_PROFILE_REQUEST = 'USER_UPDATE_PROFILE_REQUEST';
export const USER_UPDATE_PROFILE_SUCCESS = 'USER_UPDATE_PROFILE_SUCCESS';
export const USER_UPDATE_PROFILE_FAIL = 'USER_UPDATE_PROFILE_FAIL';

export const CURRENT_USER_UPDATE = 'CURRENT_USER_UPDATE';

const API_URI = process.env.REACT_APP_API_URI;

export const listGuests = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: GUEST_LIST_REQUEST });

      const { data } = await axios.get(`${API_URI}/api/guests`);

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

export const getGuestDetails = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: GUEST_DETAILS_REQUEST });

      const { data } = await axios.get(`${API_URI}/api/guests/${id}`);

      dispatch({ type: GUEST_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GUEST_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const deleteGuest = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: GUEST_DELETE_REQUEST });

      await axios.delete(`${API_URI}/api/guests/${id}`);

      dispatch({ type: GUEST_DELETE_SUCCESS });
    } catch (error) {
      dispatch({
        type: GUEST_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const updateGuest = (id, email, phone, title, isAdmin) => {
  return async (dispatch) => {
    try {
      dispatch({ type: GUEST_UPDATE_REQUEST });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      await axios.put(
        `${API_URI}/api/guests/${id}`,
        { email, phone, title, isAdmin },
        config
      );

      dispatch({ type: GUEST_UPDATE_SUCCESS });
    } catch (error) {
      dispatch({
        type: GUEST_UPDATE_FAIL,
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

      const { data } = await axios.get(`${API_URI}/api/auth/currentuser`);

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
        `${API_URI}/api/guests/profile`,
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
