import React from 'react';

import ItemCard from '../ItemCard';

const MealList = ({ meals }) => {
  if (meals.length === 0) {
    return (
      <div className='empty-search'>
        <h3>Unfortunately no meals match your search parameters</h3>
      </div>
    );
  }

  return (
    <section className='roomsList'>
      <div className='roomslist-center'>
        {meals.map((item) => (
          <ItemCard
            key={item.id}
            id={item.id}
            title={item.name}
            price={item.price}
            imageUrl={item.imageUrl}
            cardFor='meal'
            link
          />
        ))}
      </div>
    </section>
  );
};

export default MealList;
