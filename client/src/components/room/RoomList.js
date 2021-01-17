import React from 'react';

import ItemCard from '../ItemCard';

const RoomList = ({ rooms }) => {
  if (rooms.length === 0) {
    return (
      <div className='empty-search'>
        <h3>Unfortunately no rooms match your search parameters</h3>
      </div>
    );
  }

  return (
    <section className='roomsList'>
      <div className='roomslist-center'>
        {rooms.map((item) => (
          <ItemCard
            key={item.id}
            id={item.id}
            title={item.name}
            price={item.price}
            imageUrl={item.images[0]}
          />
        ))}
      </div>
    </section>
  );
};

export default RoomList;
