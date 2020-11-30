import {
  ROOM_DETAILS_FAIL,
  ROOM_DETAILS_REQUEST,
  ROOM_DETAILS_SUCCESS,
  ROOM_LIST_FAIL,
  ROOM_LIST_REQUEST,
  ROOM_LIST_SUCCESS,
  ROOM_LIST_FILTER,
} from '../actions/rooms';

const roomsInitialState = {
  rooms: [],
  featuredRooms: [],
  filteredRooms: [],
};

export const roomListReducer = (state = roomsInitialState, action) => {
  switch (action.type) {
    case ROOM_LIST_REQUEST:
      return { ...state, loading: true };
    case ROOM_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        rooms: action.payload,
        featuredRooms: action.payload.filter((room) => room.featured === true),
        filteredRooms: action.payload,
      };
    case ROOM_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    case ROOM_LIST_FILTER:
      let tempRooms = [...state.rooms];

      const {
        type,
        capacity,
        price,
        minPrice,
        maxPrice,
        minSize,
        maxSize,
        breakfast,
        pets,
      } = action.payload;

      if (type !== 'all') {
        tempRooms = tempRooms.filter((room) => room.type === type);
      }

      return { ...state, filteredRooms: tempRooms };
    default:
      return state;
  }
};

export const roomDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case ROOM_DETAILS_REQUEST:
      return { loading: true };
    case ROOM_DETAILS_SUCCESS:
      return {
        loading: false,
        room: action.payload,
      };
    case ROOM_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
