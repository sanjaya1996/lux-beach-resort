import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';

import Title from '../components/Title';

const ProfileScreen = () => {
  // const dispatch = useDispatch();

  // const currentUser = useSelector((state) => state.currentUser);
  // const { user, isAuthenticated } = currentUser;

  return (
    <div className='profile-screen'>
      <div className='user-profile'>
        <div style={{ display: 'inline-block' }}>
          <Title title='Profile' />
        </div>
        <form className='form-container'>
          <div className='form-group'>
            <label htmlFor='name'>Name:</label>
            <input type='text' name='name' id='name' className='form-control' />
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Email:</label>
            <input
              type='email'
              name='email'
              id='email'
              className='form-control'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='title'>Title:</label>
            <select
              // name={name}
              // value={inputState.value}
              // onChange={textChangeHandler}
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
  );
};

export default ProfileScreen;
