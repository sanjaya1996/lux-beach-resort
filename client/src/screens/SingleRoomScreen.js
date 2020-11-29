import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as roomsActions from '../store/actions/rooms';

const SingleRoomScreen = ({ match }) => {
  const roomId = match.params.id;

  const dispatch = useDispatch();

  const roomDetails = useSelector((state) => state.roomDetails);
  const { loading, room, error } = roomDetails;

  useEffect(() => {
    dispatch(roomsActions.listRoomDetails(roomId));
  }, [dispatch, roomId]);

  return loading ? <div>loading......</div> : <div>{room.name}</div>;
};

export default SingleRoomScreen;
