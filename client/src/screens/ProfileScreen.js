import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Title from '../components/Title';
import Loading from '../components/Loading';
import AlertBox from '../components/AlertBox';
import * as guestActions from '../store/actions/guests';
import { USER_UPDATE_PROFILE_RESET } from '../store/reducers/guests';

const ProfileScreen = ({ history }) => {
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [phone, setPhone] = useState('');

  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.currentUser);
  const { user, isAuthenticated } = currentUser;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, success, error } = userUpdate;

  useEffect(() => {
    if (isAuthenticated === false) {
      history.push('/login');
    } else if (user) {
      setEmail(user.email);
      setTitle(user.title || 'Mr');
      setPhone(user.phone);
    }
  }, [isAuthenticated, history, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(guestActions.updateUserProfile(phone, email, title));
  };

  const alertCloseHandler = () => {
    dispatch({ type: USER_UPDATE_PROFILE_RESET });
  };

  if (!user) {
    return <Loading />;
  }

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
        {loading ? (
          <Loading />
        ) : (
          <div className='user-profile'>
            <div style={{ display: 'inline-block' }}>
              <Title title='Profile' />
            </div>

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
          </div>
        )}

        <div className='bookings'>
          <div style={{ display: 'inline-block' }}>
            <Title title='Bookings' />
          </div>
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
                <tr>
                  <td>454549893</td>
                  <td>2020-05-20</td>
                  <td>2020-07-20</td>
                  <td>2020-07-22</td>
                  <td>x</td>
                  <td> Details</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileScreen;
