import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import RoomsFilter from './RoomsFilter';
import RoomList from './RoomList';
import Loading from '../Loading';
import * as roomsActions from '../../store/actions/rooms';
import AlertBox from '../AlertBox';

const RoomsContainer = () => {
  const dispatch = useDispatch();

  const roomList = useSelector((state) => state.roomList);
  const { loading, rooms, filteredRooms, filters, error } = roomList;

  useEffect(() => {
    dispatch(roomsActions.listRooms());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div>
        <AlertBox message={'Error! ' + error} />
      </div>
    );
  }

  if (rooms.length === 0) {
    return <RoomList rooms={filteredRooms} />;
  } else {
    return (
      <>
        <RoomsFilter rooms={rooms} filters={filters} />
        <RoomList rooms={filteredRooms} />
      </>
    );
  }
};

export default RoomsContainer;
