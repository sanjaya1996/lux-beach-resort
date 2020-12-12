import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';

import * as cartActions from '../store/actions/cart';
import * as roomActions from '../store/actions/rooms';
import { CHECK_AVAILABILITY_RESET } from '../store/reducers/rooms';

const CartScreen = ({ history }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

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

  const showAlert = (error) => {
    const click = window.confirm(error);
    if (click === true || click === false) {
      dispatch({ type: CHECK_AVAILABILITY_RESET });
    }
  };

  useEffect(() => {
    setCheckInDateState(initialCheckInDates);
    setCheckOutDateState(initialCheckOutDates);
    setMinCheckOutDateState(initialMinCheckOutDates);
    setGuestsState(initialGuests);
    // eslint-disable-next-line
  }, [cartItems]);

  // change minCheckout change whenever checkIn date changes
  useEffect(() => {
    let newState = [];
    checkInDateState.forEach((item) => {
      newState.push({ id: item.id, date: addDays(item.date, 1) });
    });
    setMinCheckOutDateState(newState);
  }, [checkInDateState]);

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

  const submitHandler = (e, id, checkIn, checkOut, guests) => {
    e.preventDefault();
    dispatch(roomActions.checkAvailability(id, checkIn, checkOut, guests));
  };

  const removeFromCartHandler = (id) => {
    dispatch(cartActions.removeFromCart(id));
  };

  const inputChangeHandler = (identifier, value, inputRoomId) => {
    let newItem;
    let initialState;
    let newState;
    if (identifier === 'checkin' || identifier === 'checkout') {
      newItem = { id: inputRoomId, date: value };
      initialState =
        identifier === 'checkin'
          ? [...checkInDateState]
          : [...checkOutDateState];
    } else if (identifier === 'guests') {
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
      {error && showAlert(error)}
      {cartItems.length === 0 ? (
        <h1>Your Cart is Empty</h1>
      ) : (
        cartItems.map((room) => {
          const findCheckInDate = checkInDateState.find(
            (state) => state.id === room.id
          );

          const selectedCheckInDate = findCheckInDate
            ? findCheckInDate.date
              ? new Date(findCheckInDate.date)
              : room.checkInDate
            : room.checkInDate;

          const findCheckOutDate = checkOutDateState.find(
            (state) => state.id === room.id
          );
          const selectedCheckOutDate = findCheckOutDate
            ? findCheckOutDate.date
              ? new Date(findCheckOutDate.date)
              : room.checkOutDate
            : room.checkOutDate;

          const findGuests = guestsState.find((state) => state.id === room.id);
          const guestsValue = findGuests
            ? findGuests.guests
              ? findGuests.guests
              : room.guests
            : room.guests;

          const findMinCheckOutDate = minCheckOutDateState.find(
            (state) => state.id === room.id
          );
          const minCheckOutValue = findMinCheckOutDate
            ? findMinCheckOutDate.date
              ? findMinCheckOutDate.date
              : new Date()
            : new Date();
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
                <form
                  onSubmit={(e) =>
                    submitHandler(
                      e,
                      room.id,
                      selectedCheckInDate,
                      selectedCheckOutDate,
                      guestsValue
                    )
                  }
                  id='filter-form'
                >
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
                      minDate={new Date(minCheckOutValue)}
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
                      value={guestsValue}
                      onChange={(e) =>
                        inputChangeHandler('guests', e.target.value, room.id)
                      }
                      className='date-input'
                    />
                  </div>
                  <div>
                    <button type='submit' className='btn-primary action-btn'>
                      {loading ? 'Loading...' : 'Select'}
                    </button>
                  </div>
                  <div>
                    <p
                      style={{
                        textDecoration: 'underline',
                        display: 'inline-block',
                        color: 'red',
                        cursor: 'pointer',
                      }}
                      onClick={() => removeFromCartHandler(room.id)}
                    >
                      <i>Remove</i>
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
