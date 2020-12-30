import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import Title from '../components/Title';
import Loading from '../components/Loading';
import AlertBox from '../components/AlertBox';
import * as guestActions from '../store/actions/guests';
import * as bookingActions from '../store/actions/bookings';
import { USER_UPDATE_PROFILE_RESET } from '../store/reducers/guests';

const ProfileScreen = ({ history }) => {
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [phone, setPhone] = useState('');

  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.currentUser);
  const { user, isAuthenticated } = currentUser;

  const bookingListMy = useSelector((state) => state.bookingListMy);
  const {
    loading: loadingBooking,
    error: errorBooking,
    bookings,
  } = bookingListMy;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, success, error } = userUpdate;

  useEffect(() => {
    if (isAuthenticated === false) {
      history.push('/login');
    } else if (user) {
      setEmail(user.email);
      setTitle(user.title || 'Mr');
      setPhone(user.phone || '');
    }

    dispatch(bookingActions.listMyBookings());
  }, [isAuthenticated, history, user, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(guestActions.updateUserProfile(phone, email, title));
  };

  const alertCloseHandler = () => {
    dispatch({ type: USER_UPDATE_PROFILE_RESET });
  };

  return (
    <>
      {success && (
        <AlertBox
          message='Profile Updated Successfully!'
          type='success'
          onClose={alertCloseHandler}
        />
      )}
      {error && (
        <AlertBox message={'Error! ' + error} onClose={alertCloseHandler} />
      )}
      <div className='profile-screen'>
        <div className='user-profile'>
          <div style={{ display: 'inline-block' }}>
            <Title title='Profile' />
          </div>
          {loading || !user ? (
            <Loading />
          ) : (
            <form onSubmit={submitHandler} className='form-container'>
              <div className='form-group'>
                <label htmlFor='name'>Name:</label>
                <input
                  disabled
                  type='text'
                  name='name'
                  id='name'
                  value={user.name}
                  className='form-control'
                />
              </div>
              <div className='form-group'>
                <label htmlFor='email'>Email:</label>
                <input
                  disabled={user.auth_provider_name === 'google'}
                  type='email'
                  name='email'
                  id='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='form-control'
                />
              </div>
              <div className='form-group'>
                <label htmlFor='title'>Title:</label>
                <select
                  name='title'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className='form-control'
                >
                  {['Mr', 'Dr', 'Miss', 'Mr & Mrs', 'Mrs', 'Ms'].map(
                    (item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div className='form-group'>
                <label htmlFor='phone'>Phone:</label>
                <input
                  type='text'
                  name='phone'
                  id='phone'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className='form-control'
                />
              </div>

              <div className='form-group'>
                <button type='submit' className='btn-primary'>
                  Update Profile
                </button>
              </div>
            </form>
          )}
        </div>

        <div className='bookings'>
          <div style={{ display: 'inline-block' }}>
            <Title title='Bookings' />
          </div>
          {loadingBooking ? (
            <Loading />
          ) : bookings.length === 0 ? (
            /* <h3>You have no bookings</h3> */
            <AlertBox message='You have no bookings!' type='success' noBtn />
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table>
                <tbody>
                  <tr>
                    <th>ID</th>
                    <th>BOOKED DATE</th>
                    <th>CHECKIN</th>
                    <th>CHECKOUT</th>
                    <th>PAID</th>
                    <th></th>
                  </tr>
                  {bookings.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{moment(item.booked_date).format('YYYY-MM-DD')}</td>
                      <td>{moment(item.checkin_date).format('YYYY-MM-DD')}</td>
                      <td>{moment(item.checkout_date).format('YYYY-MM-DD')}</td>
                      <td>
                        {item.is_paid ? (
                          <i
                            style={{ color: '#4BB543' }}
                            className='fas fa-check'
                          ></i>
                        ) : (
                          <span style={{ color: 'red', fontWeight: 'bold' }}>
                            x
                          </span>
                        )}
                      </td>
                      <td>
                        <Link
                          to={
                            item.is_paid
                              ? `/booking/${item.id}?bookingId=${item.id}`
                              : `/payment/${item.room_id}/${item.total_guests}/${item.checkin_date}/${item.checkout_date}`
                          }
                        >
                          <button className='btn-primary'>Details</button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileScreen;
