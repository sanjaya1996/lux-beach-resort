import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const defaultImage = '/images/room-1.jpeg';

const Room = ({ room }) => {
  const { name, id, images, price } = room;

  return (
    <article className='room'>
      <div className='img-container'>
        <img src={images[0] || defaultImage} alt='single room' />
        <div className='price-top'>
          <h6>${price}</h6>
          <p>per night</p>
        </div>
        <Link to={`/rooms/${id}`} className='btn-primary room-link'>
          Features
        </Link>
        <p className='room-info'>{name}</p>
      </div>
    </article>
  );
};

Room.propTypes = {
  room: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.object).isRequired,
    price: PropTypes.number.isRequired,
  }),
};

export default Room;
