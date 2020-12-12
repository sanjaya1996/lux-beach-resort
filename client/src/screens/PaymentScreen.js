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
    <ul>
      <li>Name: {selectedRoom.name}</li>
      <li>Guests: {selectedGuests}</li>
      <li>Room Capacity: {selectedRoom.capacity}</li>
      <li>Checkin: {selectedCheckIn}</li>
      <li>Checkout: {selectedCheckOut}</li>
    </ul>
  );
};

export default PaymentScreen;
