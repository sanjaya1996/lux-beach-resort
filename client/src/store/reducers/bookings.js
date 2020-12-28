import {
  BOOKING_LIST_MY_FAIL,
  BOOKING_LIST_MY_REQUEST,
  BOOKING_LIST_MY_SUCCESS,
  ROOM_BOOKING_FAIL,
  ROOM_BOOKING_REQUEST,
  ROOM_BOOKING_SUCCESS,
} from '../actions/bookings';

export const ROOM_BOOKING_RESET = 'ROOM_BOOKING_RESET';

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
