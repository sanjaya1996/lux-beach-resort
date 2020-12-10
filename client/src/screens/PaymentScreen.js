import React from 'react';

const PaymentScreen = ({ match, location }) => {
  // Room Id
  const roomId = match.params.id;

  // Check-In Date
  const checkInQuery = location.search.split('&')[0];
  const checkIn = checkInQuery.split('=')[1];

  // Check-Out Date
  const checkoutQuery = location.search.split('&')[1];
  const checkOut = checkoutQuery.split('=')[1];

  return <h1>This is payment Screen</h1>;
};

export default PaymentScreen;
