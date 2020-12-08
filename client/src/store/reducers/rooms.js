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
            console.log('......................');
            const bookingsOfCurrentRoom = bookings.filter(
              (item) => item.room_id === room.id
            );
            console.log(bookingsOfCurrentRoom);

            console.log('Log me boy...');
            console.log(
              new Date(bookingsOfCurrentRoom[0].checkin_date) <
                new Date(checkInDate)
            );

            const returnValue = bookingsOfCurrentRoom.every((booking) => {
              return (
                (new Date(checkInDate) < new Date(booking.checkin_date) &&
                  new Date(checkOutDate) <= new Date(booking.checkout_date)) ||
                new Date(checkInDate) >= new Date(booking.checkout_date)
              );
              // checkInDate = new Date(checkInDate);
              // let bookingCheckinDate = new Date(booking.checkin_date);
              // // if (
              // //   (checkInDate < booking.checkin_date &&
              // //     checkOutDate <= booking.checkin_date) ||
              // //   checkInDate >= booking.checkout_date
              // // ) {
              // if (checkInDate < bookingCheckinDate) {
              //   console.log('check date is true');
              //   return true;
              // } else {
              //   console.log('checked date is false');
              //   return false;
              // }
            });
            console.log(returnValue);
            return returnValue;
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
