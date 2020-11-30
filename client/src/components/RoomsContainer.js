import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import RoomsFilter from './RoomFilter';
import RoomsList from './RoomList';
import Loading from './Loading';
import * as roomsActions from '../store/actions/rooms';

const RoomsContainer = () => {
  const dispatch = useDispatch();

  const roomList = useSelector((state) => state.roomList);
  const { loading, rooms, error } = roomList;

  useEffect(() => {
    dispatch(roomsActions.listRooms());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <RoomsFilter rooms={rooms} />
      <RoomsList rooms={rooms} />
    </>
  );
};

export default RoomsContainer;
