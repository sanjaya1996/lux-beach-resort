import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const BookingDetailsScreen = ({ history }) => {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.currentUser);
  const { isAuthenticated } = currentUser;

  useEffect(() => {
    if (isAuthenticated === false) {
      history.push('/login');
    }
  }, [isAuthenticated, history]);

  return <h3>This is booking Details Screen</h3>;
};

export default BookingDetailsScreen;
