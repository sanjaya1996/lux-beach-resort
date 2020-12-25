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
  CHECK_AVAILABILITY_REQUEST,
  CHECK_AVAILABILITY_SUCCESS,
  CHECK_AVAILABILITY_FAIL,
  ROOM_DELETE_REQUEST,
  ROOM_DELETE_SUCCESS,
  ROOM_DELETE_FAIL,
} from '../actions/rooms';

export const ROOM_LIST_FILTER_RESET = 'ROOM_LIST_FILTER_RESET';
export const CHECK_AVAILABILITY_RESET = 'CHECK_AVAILABILITY_RESET';
export const ROOM_DETAILS_RESET = 'ROOM_DETAILS_RESET';
export const ROOM_DELETE_RESET = 'ROOM_DELETE_RESET';

const roomsInitialState = {
  rooms: [],
  featuredRooms: [],
  filteredRooms: [],
  filters: {},
  currentBookings: [],
};

export const roomListReducer = (state = roomsInitialState, action) => {
  switch (action.type) {
    case ROOM_LIST_REQUEST:
      return { ...state, loading: true };
    case ROOM_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        rooms: action.payload.rooms,
        featuredRooms: action.payload.rooms.filter(
          (room) => room.featured === true
        ),
        filteredRooms: action.payload.rooms,
        currentBookings: action.payload.currentBookings,
      };
    case ROOM_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    case ROOM_LIST_FILTER:
      // all the rooms
      let tempRooms = [...state.rooms];

      let {
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

      //filter by check In-Out date
      if (
        checkInDate &&
        checkOutDate &&
        (checkInDate !== state.filters.checkInDate ||
          checkOutDate !== state.filters.checkOutDate)
      ) {
        tempRooms = tempRooms.filter((room) => {
          if (!room.is_booked) {
            return true;
          } else {
            const bookings = state.currentBookings;

            const bookingsOfCurrentRoom = bookings.filter(
              (item) => item.room_id === room.id
            );

            // returns true if condition for all array value is true and false if only one fails
            return bookingsOfCurrentRoom.every((booking) => {
              return (
                (new Date(checkInDate) < new Date(booking.checkin_date) &&
                  new Date(checkOutDate) <= new Date(booking.checkin_date)) ||
                new Date(checkInDate) >= new Date(booking.checkout_date)
              );
            });
          }
        });
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
        checkInDate,
        checkOutDate,
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
    case ROOM_DETAILS_RESET:
      return {};
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

export const roomDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ROOM_DELETE_REQUEST:
      return { loading: true };
    case ROOM_DELETE_SUCCESS:
      return { loading: false, success: true };
    case ROOM_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case ROOM_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const checkAvailabilityReducer = (state = {}, action) => {
  switch (action.type) {
    case CHECK_AVAILABILITY_REQUEST:
      return { ...state, loading: true };
    case CHECK_AVAILABILITY_SUCCESS:
      const {
        bookingAvailable,
        message,
        room,
        id,
        checkin,
        checkout,
        guests,
      } = action.payload;
      return {
        loading: false,
        selectedRoom: room,
        selectedRoomId: id,
        selectedCheckIn: checkin,
        selectedCheckOut: checkout,
        selectedGuests: guests,
        bookingAvailable: bookingAvailable,
        error: bookingAvailable ? null : message,
      };
    case CHECK_AVAILABILITY_FAIL:
      return { loading: false, error: action.payload };
    case CHECK_AVAILABILITY_RESET:
      return {};
    default:
      return state;
  }
};
