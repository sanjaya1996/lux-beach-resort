import axios from 'axios';

export const ROOM_LIST_REQUEST = 'ROOM_LIST_REQUEST';
export const ROOM_LIST_SUCCESS = 'ROOM_LIST_SUCCESS';
export const ROOM_LIST_FAIL = 'ROOM_LIST_FAIL';

export const ROOM_LIST_FILTER = 'ROOM_LIST_FILTER';

export const ROOM_DETAILS_REQUEST = 'ROOM_DETAILS_REQUEST';
export const ROOM_DETAILS_SUCCESS = 'ROOM_DETAILS_SUCCESS';
export const ROOM_DETAILS_FAIL = 'ROOM_DETAILS_FAIL';

export const ROOM_CREATE_REQUEST = 'ROOM_CREATE_REQUEST';
export const ROOM_CREATE_SUCCESS = 'ROOM_CREATE_SUCCESS';
export const ROOM_CREATE_FAIL = 'ROOM_CREATE_FAIL';

export const CHECK_AVAILABILITY_REQUEST = 'CHECK_AVAILABILITY_REQUEST';
export const CHECK_AVAILABILITY_SUCCESS = 'CHECK_AVAILABILITY_SUCCESS';
export const CHECK_AVAILABILITY_FAIL = 'CHECK_AVAILABILITY_FAIL';

export const listRooms = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: ROOM_LIST_REQUEST });

      const { data: rooms } = await axios.get('/api/rooms');

      const { data: currentBookings } = await axios.get(
        '/api/bookings/current'
      );

      dispatch({
        type: ROOM_LIST_SUCCESS,
        payload: { rooms, currentBookings },
      });
    } catch (err) {
      dispatch({
        type: ROOM_LIST_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};

export const filterRooms = (
  type,
  capacity,
  price,
  maxPrice,
  minSize,
  maxSize,
  breakfast,
  pets,
  checkInDate,
  checkOutDate
) => {
  return (dispatch) => {
    dispatch({
      type: ROOM_LIST_FILTER,
      payload: {
        type,
        capacity,
        price,
        maxPrice,
        minSize,
        maxSize,
        breakfast,
        pets,
        checkInDate,
        checkOutDate,
      },
    });
  };
};

export const listRoomDetails = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ROOM_DETAILS_REQUEST });

      const { data } = await axios.get(`/api/rooms/${id}`);

      dispatch({ type: ROOM_DETAILS_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: ROOM_DETAILS_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
};

export const createRoom = (room) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ROOM_CREATE_REQUEST });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post('/api/rooms', room, config);

      dispatch({ type: ROOM_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ROOM_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};
