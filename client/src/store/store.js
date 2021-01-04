import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  checkAvailabilityReducer,
  roomCreateReducer,
  roomDeleteReducer,
  roomDetailsReducer,
  roomListReducer,
  roomUpdateReducer,
} from './reducers/rooms';
import { cartReducer } from './reducers/cart';
import {
  bookingDetailsReducer,
  bookingListMyReducer,
  bookingListReducer,
  bookingPayReducer,
  roomBookingReducer,
} from './reducers/bookings';
import { currentUserReducer, userUpdateReducer } from './reducers/guests';
import { mealDetailsReducer, mealListReducer } from './reducers/menu';

const cartRoomsFromStorage = localStorage.getItem('cartRooms')
  ? JSON.parse(localStorage.getItem('cartRooms'))
  : [];

const cartMealsFromStorage = localStorage.getItem('cartMeals')
  ? JSON.parse(localStorage.getItem('cartMeals'))
  : [];

const rootReducer = combineReducers({
  roomList: roomListReducer,
  roomDetails: roomDetailsReducer,
  roomCreate: roomCreateReducer,
  roomUpdate: roomUpdateReducer,
  roomDelete: roomDeleteReducer,
  cart: cartReducer,
  checkRoomAvailability: checkAvailabilityReducer,
  roomBooking: roomBookingReducer,
  bookingList: bookingListReducer,
  bookingListMy: bookingListMyReducer,
  bookingDetails: bookingDetailsReducer,
  bookingPay: bookingPayReducer,
  mealList: mealListReducer,
  mealDetails: mealDetailsReducer,
  currentUser: currentUserReducer,
  userUpdate: userUpdateReducer,
});

const initialState = {
  cart: {
    rooms: cartRoomsFromStorage,
    meals: cartMealsFromStorage,
  },
};
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(ReduxThunk))
);

export default store;
