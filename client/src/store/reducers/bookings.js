import {
  ROOM_BOOKING_FAIL,
  ROOM_BOOKING_REQUEST,
  ROOM_BOOKING_RESET,
  ROOM_BOOKING_SUCCESS,
} from '../actions/bookings';

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
