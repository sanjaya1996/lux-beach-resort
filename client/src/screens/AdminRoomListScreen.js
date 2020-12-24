import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loading from '../components/Loading';
import Title from '../components/Title';
import * as roomActions from '../store/actions/rooms';

const AdminRoomListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.currentUser);
  const { user, isAuthenticated } = currentUser;

  const roomList = useSelector((state) => state.roomList);
  const { loading, rooms, error } = roomList;

  useEffect(() => {
    if (!isAuthenticated || !user.is_admin) {
      history.push('/login');
    } else {
      dispatch(roomActions.listRooms());
    }
  }, [dispatch, isAuthenticated, user, history]);

  const editRoomHandler = (id) => {
    history.push(`/admin/room/${id}/edit`);
  };

  const createRoomHandler = () => {
    history.push('/admin/room/edit');
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <div className='admin-roomlist'>
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
              <th>ACTION</th>
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
                        justifyContent: 'space-around',
                      }}
                    >
                      <i
                        onClick={() => editRoomHandler(room.id)}
                        style={{ cursor: 'pointer' }}
                        className='fas fa-edit'
                      ></i>
                      <i
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
