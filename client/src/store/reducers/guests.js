import {
  CURRENT_USER_FAIL,
  CURRENT_USER_REQUEST,
  CURRENT_USER_SUCCESS,
  CURRENT_USER_UPDATE,
  GUEST_DELETE_FAIL,
  GUEST_DELETE_REQUEST,
  GUEST_DELETE_SUCCESS,
  GUEST_DETAILS_FAIL,
  GUEST_DETAILS_REQUEST,
  GUEST_DETAILS_SUCCESS,
  GUEST_LIST_FAIL,
  GUEST_LIST_REQUEST,
  GUEST_LIST_SUCCESS,
  GUEST_UPDATE_FAIL,
  GUEST_UPDATE_REQUEST,
  GUEST_UPDATE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
} from '../actions/guests';

export const CURRENT_USER_RESET = 'CURRENT_USER_RESET';
export const USER_UPDATE_PROFILE_RESET = 'USER_UPDATE_PROFILE_RESET';
export const GUEST_DELETE_RESET = 'GUEST_DELETE_RESET';
export const GUEST_UPDATE_RESET = 'GUEST_UPDATE_RESET';

export const guestListReducer = (state = { guests: [] }, action) => {
  switch (action.type) {
    case GUEST_LIST_REQUEST:
      return { ...state, loading: true };
    case GUEST_LIST_SUCCESS:
      return { loading: false, guests: action.payload };
    case GUEST_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const guestDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case GUEST_DETAILS_REQUEST:
      return { ...state, loading: true };
    case GUEST_DETAILS_SUCCESS:
      return { loading: false, guest: action.payload };
    case GUEST_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const guestDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case GUEST_DELETE_REQUEST:
      return { ...state, loading: true };
    case GUEST_DELETE_SUCCESS:
      return { loading: false, success: true };
    case GUEST_DELETE_FAIL:
      return { ...state, loading: false, error: action.payload };
    case GUEST_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const guestUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case GUEST_UPDATE_REQUEST:
      return { ...state, loading: true };
    case GUEST_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case GUEST_UPDATE_FAIL:
      return { ...state, loading: false, error: action.payload };
    case GUEST_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

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
