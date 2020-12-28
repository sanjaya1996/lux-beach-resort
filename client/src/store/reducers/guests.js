import {
  CURRENT_USER_FAIL,
  CURRENT_USER_REQUEST,
  CURRENT_USER_SUCCESS,
  CURRENT_USER_UPDATE,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
} from '../actions/guests';

export const CURRENT_USER_RESET = 'CURRENT_USER_RESET';
export const USER_UPDATE_PROFILE_RESET = 'USER_UPDATE_PROFILE_RESET';

export const currentUserReducer = (state = {}, action) => {
  switch (action.type) {
    case CURRENT_USER_REQUEST:
      return { loading: true };
    case CURRENT_USER_SUCCESS:
      return { loading: false, ...action.payload };
    case CURRENT_USER_FAIL:
      return { loading: false, error: action.payload };
    case CURRENT_USER_UPDATE:
      return { ...state, user: action.payload };
    case CURRENT_USER_RESET:
      return {};
    default:
      return state;
  }
};

export const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true };
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};
