import React, { useState } from 'react';

import ItemCard from '../ItemCard';
import AlertBox from '../AlertBox';

const MealList = ({ meals }) => {
  const [showModal, setShowModal] = useState(false);
  const [clickedMeal, setClickedMeal] = useState({});
  console.log(clickedMeal);

  const showModalHandler = (id) => {
    const meal = meals.find((meal) => meal.id === id);
    setClickedMeal(meal);

    setShowModal(true);
  };

  const closeModalHandler = () => {
    setShowModal(false);
    setClickedMeal({});
  };

  if (meals.length === 0) {
    return (
      <div className='empty-search'>
        <AlertBox
          message='Unfortunately no meals match your search parameters!'
          type='message'
          noBtn
        />
      </div>
    );
  }

  return (
    <>
      <section className='roomsList'>
        <div className='roomslist-center'>
          {meals.map((item) => (
            <ItemCard
              key={item.id}
              id={item.id}
              title={item.name}
              price={item.price}
              imageUrl={item.imageurl}
              cardFor='meal'
              link
              onClick={showModalHandler}
            />
          ))}
        </div>
      </section>
      {showModal && (
        <div className='modal-box'>
          <div className='modal-content'>
            <span className='close' onClick={closeModalHandler}>
              &times;
            </span>
            <div className='modal-image'>
              <img src={clickedMeal.imageurl} alt={clickedMeal.name} />
            </div>
            <div className='screen'>
              <h3>{clickedMeal.name}</h3>
              <p>{clickedMeal.ingredients}</p>
              <div className='modal-row modal-button-container'>
                <div className='modal-row'>
                  <div className='order-count-item order-count-btn'>
                    <span>-</span>
                  </div>
                  <div className='order-count-item'>
                    <span>1</span>
                  </div>
                  <div className='order-count-item order-count-btn'>
                    <span>+</span>
                  </div>
                </div>

                <div>
                  <button className='btn-primary action-btn btn-sm'>
                    Add to order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MealList;
