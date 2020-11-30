import axios from 'axios';

export const ROOM_LIST_REQUEST = 'ROOM_LIST_REQUEST';
export const ROOM_LIST_SUCCESS = 'ROOM_LIST_SUCCESS';
export const ROOM_LIST_FAIL = 'ROOM_LIST_FAIL';

export const ROOM_DETAILS_REQUEST = 'ROOM_DETAILS_REQUEST';
export const ROOM_DETAILS_SUCCESS = 'ROOM_DETAILS_SUCCESS';
export const ROOM_DETAILS_FAIL = 'ROOM_DETAILS_FAIL';

export const listRooms = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: ROOM_LIST_REQUEST });

      const { data } = await axios.get('/api/rooms');

      dispatch({ type: ROOM_LIST_SUCCESS, payload: data });
    } catch (err) {
      dispatch({ type: ROOM_LIST_FAIL, payload: err.message });
    }
  };
};

export const listRoomDetails = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ROOM_DETAILS_REQUEST });

      const { data } = await axios.get(`/api/rooms/${id}`);

      dispatch({ type: ROOM_DETAILS_SUCCESS, payload: data });
    } catch (err) {
      dispatch({ type: ROOM_DETAILS_FAIL, payload: err.message });
    }
  };
};