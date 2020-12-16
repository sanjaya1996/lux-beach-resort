import {
  ROOM_BOOKING_FAIL,
  ROOM_BOOKING_REQUEST,
  ROOM_BOOKING_SUCCESS,
} from '../actions/bookings';

export const roomBookingReducer = (state = {}, action) => {
  switch (action.type) {
    case ROOM_BOOKING_REQUEST:
      return { loading: true };
    case ROOM_BOOKING_SUCCESS:
      return { loading: false, success: true, data: action.payload };
    case ROOM_BOOKING_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
