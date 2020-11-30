import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import RoomsFilter from './RoomsFilter';
import RoomList from './RoomList';
import Loading from './Loading';
import * as roomsActions from '../store/actions/rooms';

const RoomsContainer = () => {
  const dispatch = useDispatch();

  const roomList = useSelector((state) => state.roomList);
  const { loading, rooms, filteredRooms, error } = roomList;

  useEffect(() => {
    dispatch(roomsActions.listRooms());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <RoomsFilter rooms={rooms} />
      <RoomList rooms={filteredRooms} />
    </>
  );
};

export default RoomsContainer;
