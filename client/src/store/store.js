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
import { mealListReducer } from './reducers/menu';

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
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
  currentUser: currentUserReducer,
  userUpdate: userUpdateReducer,
});

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
  },
};
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(ReduxThunk))
);

export default store;
