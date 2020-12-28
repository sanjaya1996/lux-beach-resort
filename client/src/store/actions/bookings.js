import axios from 'axios';

export const ROOM_BOOKING_REQUEST = 'ROOM_BOOKING_REQUEST';
export const ROOM_BOOKING_SUCCESS = 'ROOM_BOOKING_SUCCESS';
export const ROOM_BOOKING_FAIL = 'ROOM_BOOKING_FAIL';

export const bookRoom = (bookingDetails, type) => {
  return async (dispatch, getState) => {
    try {
      console.log('BOOKING ACTION FILE: ' + bookingDetails);
      dispatch({ type: ROOM_BOOKING_REQUEST });

      const {
        currentUser: { user, isAuthenticated },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      let url = '';
      let title = 'Successfully booked!';
      let message =
        'You have successfully booked your room, We will contact you soon. Thanks !';

      if (isAuthenticated && type === 'paid') {
        url = `/api/bookings/${bookingDetails.roomId}/${user.id}?paid=${true}`;
        console.log(url);
      } else if (type === 'paid') {
        url = `/api/bookings/${bookingDetails.roomId}?paid=${true}`;
      } else {
        url = '/api/bookings';
        title = 'Email Sent!';
        message = `Email has been sent to <<${bookingDetails.email}>>. Please confirm your booking from your email. Thanks`;
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
