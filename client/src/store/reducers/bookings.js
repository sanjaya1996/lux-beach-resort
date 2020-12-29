import {
  BOOKING_DETAILS_FAIL,
  BOOKING_DETAILS_REQUEST,
  BOOKING_DETAILS_SUCCESS,
  BOOKING_LIST_MY_FAIL,
  BOOKING_LIST_MY_REQUEST,
  BOOKING_LIST_MY_SUCCESS,
  MAKE_PAYMENT_FAIL,
  MAKE_PAYMENT_REQUEST,
  MAKE_PAYMENT_SUCCESS,
  ROOM_BOOKING_FAIL,
  ROOM_BOOKING_REQUEST,
  ROOM_BOOKING_SUCCESS,
} from '../actions/bookings';

export const ROOM_BOOKING_RESET = 'ROOM_BOOKING_RESET';
export const MAKE_PAYMENT_RESET = 'MAKE_PAYMENT_RESET';

export const bookingListMyReducer = (state = { bookings: [] }, action) => {
  switch (action.type) {
    case BOOKING_LIST_MY_REQUEST:
      return { loading: true };
    case BOOKING_LIST_MY_SUCCESS:
      return { loading: false, bookings: action.payload };
    case BOOKING_LIST_MY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const bookingDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOKING_DETAILS_REQUEST:
      return { loading: true };
    case BOOKING_DETAILS_SUCCESS:
      return { loading: false, booking: action.payload };
    case BOOKING_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const roomBookingReducer = (state = {}, action) => {
  switch (action.type) {
    case ROOM_BOOKING_REQUEST:
      return { loading: true };
    case ROOM_BOOKING_SUCCESS:
      return { loading: false, success: true, successMessage: action.payload };
    case ROOM_BOOKING_FAIL:
      return { loading: false, error: action.payload };
    case ROOM_BOOKING_RESET:
      return {};
    default:
      return state;
  }
};

export const bookingPayReducer = (state = {}, action) => {
  switch (action.type) {
    case MAKE_PAYMENT_REQUEST:
      return { loading: true };
    case MAKE_PAYMENT_SUCCESS:
      return { loading: false, success: true };
    case MAKE_PAYMENT_FAIL:
      return { loading: false, error: action.payload };
    case MAKE_PAYMENT_RESET:
      return {};
    default:
      return state;
  }
};
