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
import { roomBookingReducer } from './reducers/bookings';
import { currentUserReducer } from './reducers/guests';

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
  currentUser: currentUserReducer,
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
