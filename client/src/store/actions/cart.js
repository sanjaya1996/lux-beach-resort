import axios from 'axios';

export const CART_ADD_ROOM = 'CART_ADD_ROOM';
export const CART_ADD_MEAL = 'CART_ADD_MEAL';
export const CART_REMOVE_ROOM = 'CART_REMOVE_ROOM';
export const CART_REMOVE_MEAL = 'CART_REMOVE_MEAL';
export const CART_ADD_GUEST_DETAILS = 'CART_ADD_GUEST_DETAILS';

export const addToCartRoom = (id, checkInDate, checkOutDate, guests) => {
  return async (dispatch, getState) => {
    const { data } = await axios.get(`/api/rooms/${id}`);

    dispatch({
      type: CART_ADD_ROOM,
      payload: {
        id: data.id,
        name: data.name,
        images: data.images,
        price: data.price,
        checkInDate,
        checkOutDate,
        guests: data.capacity,
      },
    });

    localStorage.setItem('cartRooms', JSON.stringify(getState().cart.rooms));
  };
};

export const addToCartMeal = (meal) => {
  return async (dispatch, getState) => {
    dispatch({
      type: CART_ADD_MEAL,
      payload: meal,
    });

    localStorage.setItem('cartMeals', JSON.stringify(getState().cart.meals));
  };
};

export const removeFromCartRoom = (id) => {
  return (dispatch, getState) => {
    dispatch({ type: CART_REMOVE_ROOM, payload: id });

    localStorage.setItem('cartRooms', JSON.stringify(getState().cart.rooms));
  };
};

export const removeFromCartMeal = (id) => {
  return (dispatch, getState) => {
    dispatch({ type: CART_REMOVE_MEAL, payload: id });

    localStorage.setItem('cartMeals', JSON.stringify(getState().cart.meals));
  };
};
