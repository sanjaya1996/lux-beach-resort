import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AlertBox from '../components/AlertBox';

import Loading from '../components/Loading';
import Title from '../components/Title';
import * as guestActions from '../store/actions/guests';
import { GUEST_DELETE_RESET } from '../store/reducers/guests';

const AdminGuestListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.currentUser);
  const { user, isAuthenticated } = currentUser;

  const guestList = useSelector((state) => state.guestList);
  const { loading, guests, error } = guestList;

  const guestDelete = useSelector((state) => state.guestDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = guestDelete;

  useEffect(() => {
    if (isAuthenticated === false || (user && !user.is_admin)) {
      history.push('/login');
    } else {
      dispatch(guestActions.listGuests());
    }
  }, [dispatch, isAuthenticated, user, history, successDelete]);

  const deleteGuestHandler = (id) => {
    if (
      window.confirm('Are you Sure? Do you really want to delete this guest?')
    ) {
      dispatch(guestActions.deleteGuest(id));
    } else {
      return;
    }
  };

  const alertCloseHandler = () => {
    dispatch({ type: GUEST_DELETE_RESET });
  };

  if (loading || loadingDelete) {
    return <Loading />;
  }

  if (error) {
    return <AlertBox message={'Error! ' + error} noBtn />;
  }

  if (guests.length === 0) {
    return <AlertBox message={'No guest found'} type='message' noBtn />;
  }

  return (
    <div className='screen'>
      {errorDelete && (
        <AlertBox
          message={'Error! ' + errorDelete}
          onClose={alertCloseHandler}
        />
      )}
      {successDelete && (
        <AlertBox
          message='Guest deleted successfully'
          type='message'
          onClose={alertCloseHandler}
        />
      )}
      <Title title='Guests' />

      <div style={{ overflowX: 'auto' }}>
        <table>
          <tbody>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th style={{ minWidth: '4em' }}></th>
            </tr>
            {guests.length > 0 &&
              guests.map((guest) => (
                <tr key={guest.id}>
                  <td>{guest.id}</td>
                  <td>{guest.name}</td>
                  <td>
                    <span style={{ textTransform: 'none' }}>{guest.email}</span>
                  </td>
                  <td>
                    {guest.is_admin ? (
                      <i
                        style={{ color: '#4BB543' }}
                        className='fas fa-check'
                      ></i>
                    ) : (
                      <i style={{ color: 'red' }} className='fas fa-times'></i>
                    )}
                  </td>

                  <td>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Link to={`/admin/guest/${guest.id}/edit`}>
                        <i
                          style={{ cursor: 'pointer', color: '#000000' }}
                          className='fas fa-edit'
                        ></i>
                      </Link>
                      <i
                        onClick={() => deleteGuestHandler(guest.id)}
                        style={{ color: 'red', cursor: 'pointer' }}
                        className='fas fa-trash'
                      ></i>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminGuestListScreen;
