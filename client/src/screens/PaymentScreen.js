import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as roomActions from '../store/actions/rooms';
import ErrorScreen from './ErrorScreen';

const PaymentScreen = ({ match }) => {
  const { id, guests, chkin, chkout } = match.params;

  const dispatch = useDispatch();

  const checkRoomAvailability = useSelector(
    (state) => state.checkRoomAvailability
  );
  const {
    loading,
    bookingAvailable,
    error,
    selectedRoom,
    selectedRoomId,
    selectedCheckIn,
    selectedCheckOut,
    selectedGuests,
  } = checkRoomAvailability;

  useEffect(() => {
    dispatch(roomActions.checkAvailability(id, chkin, chkout, guests));
  }, [dispatch, id, chkin, chkout, guests]);

  if (!bookingAvailable) {
    return (
      <ErrorScreen
        title='Error Occurred!'
        subtitle='Something wrong with your bookings parameters'
      />
    );
  }

  return (
    // <ul>
    //   <li>Name: {selectedRoom.name}</li>
    //   <li>Guests: {selectedGuests}</li>
    //   <li>Room Capacity: {selectedRoom.capacity}</li>
    //   <li>Checkin: {selectedCheckIn}</li>
    //   <li>Checkout: {selectedCheckOut}</li>
    // </ul>

    <>
      <div className='summary-container'>
        <div className='one-half-responsive summary-heading'>Your Stay:</div>
        <div className='one-half-responsive'>
          <div className='one-half-responsive'>
            <span className='summary-label'>Arrival Date:</span> Sun, 13 Dec
            2020
          </div>
          <div className='one-half-responsive last'>
            <span className='summary-label'>Departure Date:</span> Sun, 13 Dec
            2020
          </div>
          <div className='one-half-responsive'>Checkin: After 2:00 PM</div>
          <div className='one-half-responsive last'>
            Checkout: Before 10:00 AM
          </div>
          <div className='one-half-responsive summary-label'>Total Guests:</div>
          <div className='one-half-responsive last'>{selectedGuests}</div>
          <div className='one-half-responsive summary-label'>
            {selectedRoom.name}
          </div>
          <div className='one-half-responsive last'>Standard Rate</div>
          <div className='one-half-responsive summary-label'>
            Booking Subtotal:
          </div>
          <div className='one-half-responsive last'>129.00</div>
          <div className='one-half-responsive summary-label'>
            Booking Total:
          </div>
          <div className='one-half-responsive last'>129.00</div>
          <div className='one-half-responsive summary-label'>
            Deposit Required:
          </div>
          <div className='one-half-responsive last'>0.00</div>
        </div>
      </div>
    </>
  );
};

export default PaymentScreen;
