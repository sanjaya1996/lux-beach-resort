import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as roomActions from '../store/actions/rooms';

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
    selectedRoomId,
    selectedCheckIn,
    selectedCheckOut,
    selectedGuests,
  } = checkRoomAvailability;

  useEffect(() => {
    dispatch(roomActions.checkAvailability(id, chkin, chkout, guests));
  }, [dispatch, id, chkin, chkout, guests]);

  if (!bookingAvailable) {
    return <h1>This is error Screen</h1>;
  }

  return <h1>This is Payment screen </h1>;
};

export default PaymentScreen;
