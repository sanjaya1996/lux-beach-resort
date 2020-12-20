import axios from 'axios';

export const ROOM_BOOKING_REQUEST = 'ROOM_BOOKING_REQUEST';
export const ROOM_BOOKING_SUCCESS = 'ROOM_BOOKING_SUCCESS';
export const ROOM_BOOKING_FAIL = 'ROOM_BOOKING_FAIL';
export const ROOM_BOOKING_RESET = 'ROOM_BOOKING_RESET';

export const bookRoom = (bookingDetails, type) => {
  return async (dispatch) => {
    try {
      console.log('BOOKING ACTION FILE: ' + bookingDetails);
      dispatch({ type: ROOM_BOOKING_REQUEST });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      let url = '';
      let title = '';
      let message = '';
      if (type === 'paid') {
        url = `/api/bookings/${bookingDetails.roomId}?paid=${true}`;
        title = 'Successfully booked!';
        message =
          'You have successfully booked your room, We will contact you soon. Thanks !';
      } else {
        url = '/api/bookings';
      }

      const { data } = await axios.post(url, bookingDetails, config);
      console.log(data);
      dispatch({ type: ROOM_BOOKING_SUCCESS, payload: { title, message } });
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
