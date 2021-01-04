import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';

import * as cartActions from '../../store/actions/cart';

// add 1 day in checkin date for minimum checkout date
const addDays = (date, days) => {
  if (date === null) {
    return new Date().setDate(new Date().getDate() + 1);
  }
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const CartRoom = ({ loading, room, onFormSubmit }) => {
  const [checkInDateState, setCheckInDateState] = useState(room.checkInDate);
  const [checkOutDateState, setCheckOutDateState] = useState(room.checkOutDate);
  const [minCheckOutDateState, setMinCheckOutDateState] = useState(
    addDays(room.checkInDate, 1)
  );
  const [guestsState, setGuestsState] = useState(room.guests);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    onFormSubmit(room.id, checkInDateState, checkOutDateState, guestsState);
  };

  const inputChangeHandler = (identifier, value) => {
    if (identifier === 'checkin') {
      setCheckInDateState(value);
    } else if (identifier === 'checkout') {
      setCheckOutDateState(value);
      setMinCheckOutDateState(addDays(value, 1));
    } else {
      setGuestsState(value);
    }
  };

  const removeFromCartHandler = (id) => {
    dispatch(cartActions.removeFromCartRoom(id));
  };

  return (
    <div className='cart-item'>
      <div className='cart-image'>
        <div className='img-container'>
          <img src={room.images[0]} alt='single room' />
          <div className='price-top'>
            <h6>${room.price}</h6>
            <p>per night</p>
          </div>
          <Link to={`/rooms/${room.id}`} className='btn-primary room-link'>
            Features
          </Link>
          <p className='room-info'>{room.name}</p>
        </div>
      </div>
      <div>
        <form onSubmit={submitHandler} id='filter-form'>
          <div>
            <label htmlFor='date'>Check-in :</label>{' '}
            <DatePicker
              minDate={new Date()}
              selected={checkInDateState}
              onChange={(date) => inputChangeHandler('checkin', date)}
              className='date-input'
            />
            <label htmlFor='date'>Check-out :</label>
            <DatePicker
              minDate={new Date(minCheckOutDateState)}
              selected={checkOutDateState}
              onChange={(date) => inputChangeHandler('checkout', date)}
              className='date-input'
            />
          </div>
          <div>
            <label htmlFor='type'>Guests</label>
            <input
              type='number'
              name='capacity'
              id='capacity'
              value={guestsState}
              onChange={(e) => inputChangeHandler('guests', e.target.value)}
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
};

export default CartRoom;
