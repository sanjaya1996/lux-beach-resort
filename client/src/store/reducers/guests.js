import {
  CURRENT_USER_FAIL,
  CURRENT_USER_REQUEST,
  CURRENT_USER_SUCCESS,
} from '../actions/guests';

export const currentUserReducer = (state = {}, action) => {
  switch (action.type) {
    case CURRENT_USER_REQUEST:
      return { loading: true };
    case CURRENT_USER_SUCCESS:
      return { loading: false, ...action.payload };
    case CURRENT_USER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
