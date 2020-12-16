import axios from 'axios';

export const ROOM_BOOKING_REQUEST = 'ROOM_BOOKING_REQUEST';
export const ROOM_BOOKING_SUCCESS = 'ROOM_BOOKING_SUCCESS';
export const ROOM_BOOKING_FAIL = 'ROOM_BOOKING_FAIL';

export const bookRoom = (bookingDetails) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ROOM_BOOKING_REQUEST });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        '/api/bookings',
        bookingDetails,
        config
      );
      console.log(data);
      dispatch({ type: ROOM_BOOKING_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ROOM_BOOKING_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};
