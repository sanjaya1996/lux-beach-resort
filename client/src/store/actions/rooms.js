import axios from 'axios';

export const ROOM_LIST_REQUEST = 'ROOM_LIST_REQUEST';
export const ROOM_LIST_SUCCESS = 'ROOM_LIST_SUCCESS';
export const ROOM_LIST_FAIL = 'ROOM_LIST_FAIL';

export const fetchRoomList = () => {
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
