import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  checkAvailabilityReducer,
  roomCreateReducer,
  roomDetailsReducer,
  roomListReducer,
} from './reducers/rooms';
import { cartReducer } from './reducers/cart';

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const rootReducer = combineReducers({
  roomList: roomListReducer,
  roomDetails: roomDetailsReducer,
  roomCreate: roomCreateReducer,
  cart: cartReducer,
  checkRoomAvailability: checkAvailabilityReducer,
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
