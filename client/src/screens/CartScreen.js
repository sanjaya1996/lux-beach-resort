import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';

import * as roomActions from '../store/actions/rooms';

const CartScreen = ({ match }) => {
  const roomId = match.params.id;
  const dispatch = useDispatch();

  const room = useSelector((state) => state.roomDetails.room);

  useEffect(() => {
    dispatch(roomActions.listRoomDetails(roomId));
  }, [dispatch, roomId]);

  if (room) {
    return (
      <div className='cart'>
        <h2>Your Rooms</h2>
        <div className='cart-item'>
          <div className='cart-image'>
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
          </div>
          <div>
            <form id='filter-form'>
              <div>
                <label htmlFor='date'>Check-in :</label>{' '}
                <DatePicker
                  minDate={new Date()}
                  // selected={checkInDate}
                  // onChange={(date) => {
                  //   setCheckInDate(date);
                  // }}
                  className='date-input'
                />
                <label htmlFor='date'>Check-out :</label>{' '}
                <DatePicker
                  // minDate={minCheckOutDate}
                  // selected={checkOutDate}
                  // onChange={(date) => setCheckOutDate(date)}
                  className='date-input'
                />
              </div>
              <div>
                <label htmlFor='type'>Guests</label>
                <input
                  type='number'
                  name='capacity'
                  id='capacity'
                  // value={formState.capacity}
                  // onChange={inputChangeHandler}
                  className='date-input'
                />
              </div>
              <div>
                <button className='btn-primary action-btn'>Select</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  } else {
    return <h1>not found</h1>;
  }
};

export default CartScreen;
