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

  let initialCheckInDates = [];
  let initialCheckOutDates = [];
  let initialGuests = [];

  cartItems.forEach((item) => {
    initialCheckInDates.push({ id: item.id, date: item.checkInDate });
    initialCheckOutDates.push({ id: item.id, date: item.checkOutDate });
    initialGuests.push({ id: item.id, guests: item.guests });
  });

  const [checkInDateState, setCheckInDateState] = useState(initialCheckInDates);
  const [checkOutDateState, setCheckOutDateState] = useState(
    initialCheckOutDates
  );

  const [guestsState, setGuestsState] = useState(initialGuests);

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

  return (
    <div className='cart'>
      <h2>Your Rooms</h2>
      {cartItems.length === 0 ? (
        <h1>Your Cart is Empty</h1>
      ) : (
        cartItems.map((room) => (
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
                    selected={
                      checkInDateState.find((state) => state.id === room.id)
                        .date === null
                        ? null
                        : new Date(
                            checkInDateState.find(
                              (state) => state.id === room.id
                            ).date
                          )
                    }
                    onChange={(date) => {
                      const newItem = { id: room.id, date: date };
                      const initialState = [...checkInDateState];
                      const newState = initialState.map((x) =>
                        x.id === room.id ? newItem : x
                      );
                      setCheckInDateState(newState);
                    }}
                    className='date-input'
                  />
                  <label htmlFor='date'>Check-out :</label>
                  <DatePicker
                    // minDate={minCheckOutDate}
                    selected={
                      checkOutDateState.find((state) => state.id === room.id)
                        .date === null
                        ? null
                        : new Date(
                            checkOutDateState.find(
                              (state) => state.id === room.id
                            ).date
                          )
                    }
                    onChange={(date) => {
                      const newItem = { id: room.id, date: date };
                      const initialState = [...checkOutDateState];
                      const newState = initialState.map((x) =>
                        x.id === room.id ? newItem : x
                      );
                      setCheckOutDateState(newState);
                    }}
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
                    onChange={(e) => {
                      const newItem = { id: room.id, guests: e.target.value };
                      const initialState = [...guestsState];
                      const newState = initialState.map((x) =>
                        x.id === room.id ? newItem : x
                      );
                      setGuestsState(newState);
                    }}
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
        ))
      )}
    </div>
  );
};

export default CartScreen;
