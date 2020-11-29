import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { roomDetailsReducer, roomListReducer } from './reducers/rooms';

const rootReducer = combineReducers({
  roomList: roomListReducer,
  roomDetails: roomDetailsReducer,
});

const initialState = {};
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(ReduxThunk))
);

export default store;
