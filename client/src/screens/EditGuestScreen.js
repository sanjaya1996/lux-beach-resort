import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Loading from '../components/Loading';
import AlertBox from '../components/AlertBox';
import * as guestActions from '../store/actions/guests';
import { GUEST_UPDATE_RESET } from '../store/reducers/guests';
import Title from '../components/Title';
// import { USER_UPDATE_PROFILE_RESET } from '../store/reducers/guests';

const EditGuestScreen = ({ match, history }) => {
  const guestId = match.params.id;
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [phone, setPhone] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.currentUser);
  const { isAuthenticated } = currentUser;

  const guestDetails = useSelector((state) => state.guestDetails);
  const { loading, error, guest } = guestDetails;

  const guestUpdate = useSelector((state) => state.guestUpdate);
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = guestUpdate;

  useEffect(() => {
    if (isAuthenticated === false) {
      history.push('/login');
    } else {
      if (successUpdate) {
        dispatch({ type: GUEST_UPDATE_RESET });
        history.push('/admin/guestlist');
      } else if (isAuthenticated) {
        dispatch(guestActions.getGuestDetails(guestId));
      }
    }
  }, [isAuthenticated, history, dispatch, guestId, successUpdate]);

  useEffect(() => {
    if (guest) {
      setEmail(guest.email);
      setTitle(guest.title || 'Mr');
      setPhone(guest.phone || '');
      setIsAdmin(guest.is_admin || false);
    }
  }, [guest]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(guestActions.updateGuest(guestId, email, phone, title, isAdmin));
  };

  const alertCloseHandler = () => {
    dispatch({ type: GUEST_UPDATE_RESET });
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <AlertBox message={'Error! ' + error} noBtn />;
  }

  if (!guest) {
    return <Loading />;
  }

  return (
    <div className='edit-form-screen'>
      <div style={{ paddingBottom: '1em' }}>
        <Link to='/admin/guestlist' className='btn-primary btn-no-color'>
          go back
        </Link>
      </div>
      <Title title='edit guest' />

      {errorUpdate && (
        <AlertBox
          message={'Error! ' + errorUpdate}
          onClose={alertCloseHandler}
        />
      )}
      {loadingUpdate ? (
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
              value={guest.name}
              className='form-control'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Email:</label>
            <input
              disabled={guest.auth_provider_name === 'google'}
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

          <div className='  form-group'>
            <div className='single-extra'>
              <input
                type='checkbox'
                name='isAdmin'
                id='isAdmin'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
              <label htmlFor='isAdmin'>is-admin</label>
            </div>
          </div>

          <div className='form-group'>
            <button type='submit' className='btn-primary'>
              Update guest
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditGuestScreen;
