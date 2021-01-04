import {
  CART_ADD_ROOM,
  CART_ADD_MEAL,
  CART_REMOVE_ROOM,
} from '../actions/cart';

export const cartReducer = (
  state = { rooms: [], meals: [], guestDetails: {} },
  action
) => {
  switch (action.type) {
    case CART_ADD_ROOM:
      const item = action.payload;
      const existItem = state.rooms.find((x) => x.id === item.id);

      if (existItem) {
        return {
          ...state,
          rooms: state.rooms.map((x) => (x.id === item.id ? item : x)),
        };
      } else {
        return {
          ...state,
          rooms: [...state.rooms, item],
        };
      }

    case CART_ADD_MEAL:
      const meal = action.payload;
      const existMeal = state.meals.find((x) => x.id === meal.id);

      if (existMeal) {
        return {
          ...state,
          meals: state.meals.map((x) => (x.id === meal.id ? meal : x)),
        };
      } else {
        return {
          ...state,
          meals: [...state.meals, meal],
        };
      }
    case CART_REMOVE_ROOM:
      return {
        ...state,
        rooms: state.rooms.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
};
