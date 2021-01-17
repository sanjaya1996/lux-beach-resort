import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

import Loading from '../../components/Loading';
import AlertBox from '../../components/AlertBox';
import Title from '../../components/Title';
import * as bookingActions from '../../store/actions/bookings';

const BookingListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.currentUser);
  const { error: errorUser, isAuthenticated, user } = currentUser;

  const bookingList = useSelector((state) => state.bookingList);
  const { loading, error, bookings } = bookingList;

  useEffect(() => {
    if (isAuthenticated === false || (user && !user.is_admin) || errorUser) {
      history.push('/login');
    } else if (user && user.is_admin) {
      dispatch(bookingActions.listBookings());
    }
  }, [dispatch, user, isAuthenticated, history, errorUser]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <AlertBox message={'Error! ' + error} noBtn />;
  }

  if (bookings.length === 0) {
    return <AlertBox message='Your bookings is empty!' type='success' noBtn />;
  }
  return (
    <div className='screen'>
      <Title title='all bookings' />
      <div style={{ overflowX: 'auto' }}>
        <table>
          <tbody>
            <tr>
              <th>ID</th>
              <th>GUEST</th>
              <th>CHECKIN</th>
              <th>CHECKOUT</th>
              <th>TOTAL AMOUNT</th>
              <th>PAID</th>
              <th>COMPLETED</th>
              <th></th>
            </tr>
            {bookings.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.guest_name}</td>
                <td>{moment(item.checkin_date).format('YYYY-MM-DD')}</td>
                <td>{moment(item.checkout_date).format('YYYY-MM-DD')}</td>
                <td>${Number(item.total_amount).toFixed(2)}</td>
                <td>
                  {item.is_paid ? (
                    moment(item.paid_at).format('YYYY-MM-DD')
                  ) : (
                    <span style={{ color: 'red', fontWeight: 'bold' }}>x</span>
                  )}
                </td>
                <td>
                  {item.is_vacated ? (
                    <i
                      style={{ color: '#4BB543' }}
                      className='fas fa-check'
                    ></i>
                  ) : (
                    <span style={{ color: 'red', fontWeight: 'bold' }}>x</span>
                  )}
                </td>
                <td>
                  <Link to={`/bookings/${item.id}`}>
                    <button className='btn-primary'>Details</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingListScreen;
