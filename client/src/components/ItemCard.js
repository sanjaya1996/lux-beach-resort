import React from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

const defaultImage = '/images/room-1.jpeg';

const ItemCard = ({ id, title, price, imageUrl, cardFor, link, onClick }) => {
  const onClickHandler = () => {
    if (onClick) {
      onClick(id);
    } else {
      return;
    }
  };

  return (
    <article
      style={{ cursor: link ? 'pointer' : '' }}
      onClick={onClickHandler}
      className='room'
    >
      <div className='img-container'>
        <img src={imageUrl || defaultImage} alt='single room' />
        <div className='price-top'>
          <h6>${price}</h6>
          {cardFor === 'room' && <p>per night</p>}
        </div>
        {cardFor === 'room' && (
          <Link to={`/rooms/${id}`} className='btn-primary room-link'>
            Features
          </Link>
        )}
      </div>
      <div className='room-info'>
        <p>{title}</p>
      </div>
    </article>
  );
};

ItemCard.defaultProps = {
  cardFor: 'room',
};

// Room.propTypes = {
//   room: PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     id: PropTypes.number.isRequired,
//     images: PropTypes.arrayOf(PropTypes.string).isRequired,
//     price: PropTypes.number.isRequired,
//   }),
// };

export default ItemCard;
