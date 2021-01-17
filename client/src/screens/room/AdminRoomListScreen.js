import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AlertBox from '../../components/AlertBox';

import Loading from '../../components/Loading';
import Title from '../../components/Title';
import * as roomActions from '../../store/actions/rooms';
import { ROOM_DELETE_RESET } from '../../store/reducers/rooms';

const AdminRoomListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.currentUser);
  const { user, isAuthenticated } = currentUser;

  const roomList = useSelector((state) => state.roomList);
  const { loading, rooms, error } = roomList;

  const roomDelete = useSelector((state) => state.roomDelete);
  const { loading: deleteLoading, success, error: deleteError } = roomDelete;

  useEffect(() => {
    if (isAuthenticated === false || (user && !user.is_admin)) {
      history.push('/login');
    } else {
      dispatch(roomActions.listRooms());
    }
  }, [dispatch, isAuthenticated, user, history, success]);

  const editRoomHandler = (id) => {
    history.push(`/admin/room/${id}/edit`);
  };

  const createRoomHandler = () => {
    history.push('/admin/room/edit');
  };

  const deleteRoomHandler = (id) => {
    if (
      window.confirm('Are you Sure? Do you really want to delete this room?')
    ) {
      dispatch(roomActions.deleteRoom(id));
    } else {
      return;
    }
  };

  const alertCloseHandler = () => {
    dispatch({ type: ROOM_DELETE_RESET });
  };

  if (loading || deleteLoading) {
    return <Loading />;
  }

  return (
    <div className='screen'>
      {(error || deleteError || success) && (
        <AlertBox
          message={error || deleteError || 'Room was successfully deleted!'}
          type={success ? 'success' : 'error'}
          onClose={error ? null : alertCloseHandler}
        />
      )}

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 0,
        }}
      >
        <Title title='Rooms' />
        <button
          onClick={createRoomHandler}
          style={{ marginBottom: '2rem' }}
          className='btn-primary'
        >
          <i className='fas fa-plus'></i> Create Room
        </button>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table>
          <tbody>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>TYPE</th>
              <th>CAPACITY / SIZE</th>
              <th>RATE (per night)</th>
              <th>BOOKED</th>
              <th style={{ minWidth: '4em' }}></th>
            </tr>
            {rooms.length > 0 &&
              rooms.map((room) => (
                <tr key={room.id}>
                  <td>{room.id}</td>
                  <td>{room.name}</td>
                  <td>{room.type}</td>
                  <td>
                    {room.capacity} ({Number(room.size).toFixed(2)}sqft)
                  </td>
                  <td>${Number(room.price).toFixed(2)}</td>
                  <td>
                    {room.is_boked ? (
                      <i
                        style={{ color: '#4BB543' }}
                        className='fas fa-check'
                      ></i>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <i
                        onClick={() => editRoomHandler(room.id)}
                        style={{ cursor: 'pointer' }}
                        className='fas fa-edit'
                      ></i>
                      <i
                        onClick={() => deleteRoomHandler(room.id)}
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

      {rooms.length === 0 && (
        <div className='centered'>
          <h3>No room found start adding some!</h3>
        </div>
      )}
    </div>
  );
};

export default AdminRoomListScreen;
