import axios from 'axios';

export const CART_ADD_ITEM = 'CART_ADD_ITEM';
export const CART_REMOVE_ITEM = 'CART_REMOVE_ITEM';
export const CART_ADD_GUEST_DETAILS = 'CART_ADD_GUEST_DETAILS';

export const addToCart = (id, checkInDate, checkOutDate, guests) => {
  return async (dispatch, getState) => {
    const { data } = await axios.get(`/api/rooms/${id}`);

    dispatch({
      type: CART_ADD_ITEM,
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

    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems)
    );
  };
};

export const removeFromCart = (id) => {
  return (dispatch, getState) => {
    dispatch({ type: CART_REMOVE_ITEM, payload: id });

    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems)
    );
  };
};
