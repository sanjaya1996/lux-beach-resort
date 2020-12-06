import {
  ROOM_DETAILS_FAIL,
  ROOM_DETAILS_REQUEST,
  ROOM_DETAILS_SUCCESS,
  ROOM_LIST_FAIL,
  ROOM_LIST_REQUEST,
  ROOM_LIST_SUCCESS,
  ROOM_LIST_FILTER,
  ROOM_CREATE_REQUEST,
  ROOM_CREATE_SUCCESS,
  ROOM_CREATE_FAIL,
} from '../actions/rooms';

export const ROOM_LIST_FILTER_RESET = 'ROOM_LIST_FILTER_RESET';

const roomsInitialState = {
  rooms: [],
  featuredRooms: [],
  filteredRooms: [],
  filters: {},
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
      // all the rooms
      let tempRooms = [...state.rooms];

      const {
        type,
        capacity,
        price,
        maxPrice,
        minSize,
        maxSize,
        breakfast,
        pets,
      } = action.payload;

      // filter by type
      if (type !== 'all') {
        tempRooms = tempRooms.filter((room) => room.type === type);
      }

      // filter by capacity
      if (capacity !== 1) {
        tempRooms = tempRooms.filter((room) => room.capacity >= capacity);
      }

      // filter by price
      if (price !== maxPrice) {
        tempRooms = tempRooms.filter((room) => room.price <= price);
      }
      //filter by room roomSize
      tempRooms = tempRooms.filter(
        (room) => room.size >= minSize && room.size <= maxSize
      );
      //filter by breakfast
      if (breakfast) {
        tempRooms = tempRooms.filter((room) => room.breakfast === true);
      }
      //filter by pets
      if (pets) {
        tempRooms = tempRooms.filter((room) => room.pets === true);
      }

      const currentFilters = {
        type,
        capacity,
        price,
        maxPrice,
        minSize,
        maxSize,
        breakfast,
        pets,
      };
      return { ...state, filteredRooms: tempRooms, filters: currentFilters };
    case ROOM_LIST_FILTER_RESET:
      return { ...state, filteredRooms: state.rooms, filters: {} };
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

export const roomCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ROOM_CREATE_REQUEST:
      return { loading: true };
    case ROOM_CREATE_SUCCESS:
      return { loading: false, success: true, room: action.payload };
    case ROOM_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
