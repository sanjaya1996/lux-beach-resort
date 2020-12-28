import axios from 'axios';

export const ROOM_BOOKING_REQUEST = 'ROOM_BOOKING_REQUEST';
export const ROOM_BOOKING_SUCCESS = 'ROOM_BOOKING_SUCCESS';
export const ROOM_BOOKING_FAIL = 'ROOM_BOOKING_FAIL';

export const BOOKING_LIST_MY_REQUEST = 'BOOKING_LIST_MY_REQUEST';
export const BOOKING_LIST_MY_SUCCESS = 'BOOKING_LIST_MY_SUCCESS';
export const BOOKING_LIST_MY_FAIL = 'BOOKING_LIST_MY_FAIL';

export const listMyBookings = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: BOOKING_LIST_MY_REQUEST });

      const { data } = await axios.get('/api/bookings/mybookings');

      dispatch({ type: BOOKING_LIST_MY_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: BOOKING_LIST_MY_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

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

export const payAndBookRoom = (
  token,
  total,
  name,
  email,
  phone,
  title,
  roomId,
  checkInDate,
  checkOutDate
) => {
  return async (dispatch) => {
    try {
      console.log(token);
      dispatch({ type: ROOM_BOOKING_REQUEST });

      const body = {
        token,
        bookingDetails: {
          guestDetails: { name, email, phone, title },
          roomId,
          checkInDate,
          checkOutDate,
        },
        amount: total,
      };

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const messageTitle = 'Successfully booked!';
      const message =
        'You have successfully booked your room, We will contact you soon. Thanks !';

      const { data } = await axios.post(
        `/api/bookings/pay/${roomId}`,
        body,
        config
      );
      console.log(data);
      dispatch({
        type: ROOM_BOOKING_SUCCESS,
        payload: { title: messageTitle, message },
      });
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
