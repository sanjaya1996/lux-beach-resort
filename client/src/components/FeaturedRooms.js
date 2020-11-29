import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loading from './Loading';
import Room from './Room';
import Title from './Title';
import * as roomActions from '../store/actions/rooms';

const FeaturedRooms = () => {
  const dispatch = useDispatch();

  const roomList = useSelector((state) => state.roomList);
  const { loading, featuredRooms, error } = roomList;

  useEffect(() => {
    dispatch(roomActions.listRooms());
  }, [dispatch]);
  return (
    <section className='featured-rooms'>
      <Title title='Featured Rooms' />
      <div className='featured-rooms-center'>
        {loading ? (
          <Loading />
        ) : (
          featuredRooms.map((room) => <Room key={room.id} room={room} />)
        )}
      </div>
    </section>
  );
};

export default FeaturedRooms;
