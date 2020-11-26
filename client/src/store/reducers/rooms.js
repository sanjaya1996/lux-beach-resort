import {
  ROOM_LIST_FAIL,
  ROOM_LIST_REQUEST,
  ROOM_LIST_SUCCESS,
} from '../actions/rooms';

const initialState = {
  rooms: [],
  featuredRooms: [],
  loading: false,
};

export const roomsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ROOM_LIST_REQUEST:
      return { ...state, loading: true };
    case ROOM_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        rooms: action.payload,
        featuredRooms: action.payload.filter((room) => room.featured === true),
      };
    case ROOM_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
