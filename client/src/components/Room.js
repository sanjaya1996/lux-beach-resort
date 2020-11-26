import React from 'react';
import { Link } from 'react-router-dom';

const Room = ({ room }) => {
  const { name, id, images, price } = room;

  return (
    <article className='room'>
      <div className='img-container'>
        <img src={images[0].url} alt='single room' />
        <div className='price-top'>
          <h6>${price}</h6>
          <p>per night</p>
        </div>
        <Link to={`/rooms/${id}`} className='btn-primary room-link'>
          Features
        </Link>
      </div>
    </article>
  );
};

export default Room;
