import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import * as roomActions from '../store/actions/rooms';
import { CHECK_AVAILABILITY_RESET } from '../store/reducers/rooms';
import AlertBox from '../components/AlertBox';
import Title from '../components/Title';
import CartRoom from '../components/room/CartRoom';
import CartMeal from '../components/meal/CartMeal';

const CartScreen = ({ history }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { rooms, meals } = cart;

  const mealsTotal = meals
    .reduce((acc, meal) => acc + Number(meal.price * meal.qty), 0)
    .toFixed(2);

  const checkRoomAvailability = useSelector(
    (state) => state.checkRoomAvailability
  );
  const {
    loading,
    bookingAvailable,
    error,
    selectedRoomId,
    selectedCheckIn,
    selectedCheckOut,
    selectedGuests,
  } = checkRoomAvailability;

  const showAlert = (error) => {
    const click = window.confirm(error);
    if (click === true || click === false) {
      dispatch({ type: CHECK_AVAILABILITY_RESET });
    }
  };

  useEffect(() => {
    if (bookingAvailable) {
      history.push(
        `/payment/${selectedRoomId}/${selectedGuests}/${selectedCheckIn}/${selectedCheckOut}`
      );
      dispatch({ type: CHECK_AVAILABILITY_RESET });
    }
  }, [
    bookingAvailable,
    history,
    dispatch,
    selectedCheckIn,
    selectedCheckOut,
    selectedRoomId,
    selectedGuests,
  ]);

  const submitHandler = (id, checkIn, checkOut, guests) => {
    dispatch(roomActions.checkAvailability(id, checkIn, checkOut, guests));
  };

  // RENDER COMPONENT

  return (
    <div className='cart'>
      {rooms.length + meals.length === 0 ? (
        <AlertBox message='Your Cart is Empty!' type='message' noBtn />
      ) : (
        <>
          {error && showAlert(error)}
          {rooms.length >= 1 && (
            <>
              <Title title='Your rooms' />
              {rooms.map((room) => (
                <CartRoom
                  key={room.id}
                  loading={loading}
                  room={room}
                  onFormSubmit={submitHandler}
                />
              ))}
            </>
          )}
          {meals.length >= 1 && (
            <>
              <Title title='Your Meals' />
              {meals.map((meal) => (
                <CartMeal key={meal.id} meal={meal} />
              ))}
              <Link to='/meal/placeorder'>
                <button className='btn-primary action-btn'>
                  Checkout orders (${mealsTotal})
                </button>
              </Link>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default CartScreen;
