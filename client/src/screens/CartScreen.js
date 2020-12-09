import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';

import * as cartActions from '../store/actions/cart';

const CartScreen = ({ match }) => {
  const roomId = match.params.id;
  const dispatch = useDispatch();

  const filters = useSelector((state) => state.roomList.filters);
  const { capacity, checkInDate, checkOutDate } = filters;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  // add 1 day in checkin date for minimum checkout date
  const addDays = (date, days) => {
    if (date === null) {
      return new Date().setDate(new Date().getDate() + 1);
    }
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  // Initializing state variables
  let initialCheckInDates = [];
  let initialCheckOutDates = [];
  let initialGuests = [];
  let initialMinCheckOutDates = [];

  cartItems.forEach((item) => {
    initialCheckInDates.push({ id: item.id, date: item.checkInDate });
    initialCheckOutDates.push({ id: item.id, date: item.checkOutDate });
    initialMinCheckOutDates.push({
      id: item.id,
      date: addDays(item.checkInDate, 1),
    });
    initialGuests.push({ id: item.id, guests: item.guests });
  });

  // State values

  const [checkInDateState, setCheckInDateState] = useState(initialCheckInDates);
  const [checkOutDateState, setCheckOutDateState] = useState(
    initialCheckOutDates
  );
  const [minCheckOutDateState, setMinCheckOutDateState] = useState(
    initialMinCheckOutDates
  );

  const [guestsState, setGuestsState] = useState(initialGuests);

  // change minCheckout change whenever checkIn date changes
  useEffect(() => {
    let newState = [];
    checkInDateState.forEach((item) => {
      newState.push({ id: item.id, date: addDays(item.date, 1) });
    });
    setMinCheckOutDateState(newState);
  }, [checkInDateState]);

  useEffect(() => {
    if (roomId) {
      dispatch(
        cartActions.addToCart(
          roomId,
          checkInDate ? checkInDate : null,
          checkOutDate ? checkOutDate : null,
          capacity ? capacity : 1
        )
      );
    }
  }, [dispatch, roomId, checkInDate, checkOutDate, capacity]);

  const removeFromCartHandler = (id) => {
    dispatch(cartActions.removeFromCart(id));
  };

  const inputChangeHandler = (identifier, value, inputRoomId) => {
    let newItem;
    let initialState;
    let newState;
    if (identifier === 'checkin' || 'checkout') {
      newItem = { id: inputRoomId, date: value };
      initialState =
        identifier === 'checkin'
          ? [...checkInDateState]
          : [...checkOutDateState];
    } else {
      newItem = { id: inputRoomId, guests: value };
      initialState = [...guestsState];
    }

    newState = initialState.map((x) => (x.id === inputRoomId ? newItem : x));
    if (identifier === 'checkin') {
      setCheckInDateState(newState);
    } else if (identifier === 'checkout') {
      setCheckOutDateState(newState);
    } else {
      setGuestsState(newState);
    }
  };

  // RENDER COMPONENT

  return (
    <div className='cart'>
      <h2>Your Rooms</h2>
      {cartItems.length === 0 ? (
        <h1>Your Cart is Empty</h1>
      ) : (
        cartItems.map((room) => {
          const selectedCheckInDate =
            checkInDateState.find((state) => state.id === room.id).date === null
              ? null
              : new Date(
                  checkInDateState.find((state) => state.id === room.id).date
                );
          const selectedCheckOutDate =
            checkOutDateState.find((state) => state.id === room.id).date ===
            null
              ? null
              : new Date(
                  checkOutDateState.find((state) => state.id === room.id).date
                );
          return (
            <div className='cart-item' key={room.id}>
              <div className='cart-image'>
                <div className='img-container'>
                  <img src={room.images[0]} alt='single room' />
                  <div className='price-top'>
                    <h6>${room.price}</h6>
                    <p>per night</p>
                  </div>
                  <Link
                    to={`/rooms/${room.id}`}
                    className='btn-primary room-link'
                  >
                    Features
                  </Link>
                  <p className='room-info'>{room.name}</p>
                </div>
              </div>
              <div>
                <form id='filter-form'>
                  <div>
                    <label htmlFor='date'>Check-in :</label>{' '}
                    <DatePicker
                      minDate={new Date()}
                      selected={selectedCheckInDate}
                      onChange={(date) =>
                        inputChangeHandler('checkin', date, room.id)
                      }
                      className='date-input'
                    />
                    <label htmlFor='date'>Check-out :</label>
                    <DatePicker
                      minDate={
                        new Date(
                          minCheckOutDateState.find(
                            (state) => state.id === room.id
                          ).date
                        )
                      }
                      selected={selectedCheckOutDate}
                      onChange={(date) =>
                        inputChangeHandler('checkout', date, room.id)
                      }
                      className='date-input'
                    />
                  </div>
                  <div>
                    <label htmlFor='type'>Guests</label>
                    <input
                      type='number'
                      name='capacity'
                      id='capacity'
                      value={
                        guestsState.find((state) => state.id === room.id).guests
                      }
                      onChange={(e) =>
                        inputChangeHandler('guests', e.target.value, room.id)
                      }
                      className='date-input'
                    />
                  </div>
                  <div>
                    <button className='btn-primary action-btn'>Select</button>
                  </div>
                  <div>
                    <p
                      style={{
                        textDecoration: 'underline',
                        color: 'red',
                        cursor: 'pointer',
                      }}
                      onClick={() => removeFromCartHandler(room.id)}
                    >
                      Remove
                    </p>
                  </div>
                </form>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default CartScreen;
