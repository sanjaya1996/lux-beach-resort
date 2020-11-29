import React from 'react';
import RoomsFilter from './RoomFilter';
import RoomsList from './RoomList';

const RoomContainer = () => {
  return (
    <div>
      Hello from Rooms Container
      <RoomsFilter />
      <RoomsList />
    </div>
  );
};

export default RoomContainer;
