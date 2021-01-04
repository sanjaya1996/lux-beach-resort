import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import ItemCard from '../ItemCard';
import AlertBox from '../AlertBox';
import * as cartActions from '../../store/actions/cart';

const MealList = ({ meals }) => {
  const [showModal, setShowModal] = useState(false);
  const [clickedMeal, setClickedMeal] = useState({});
  const [orderCount, setOrderCount] = useState(1);

  const dispatch = useDispatch();
  let meal = {};

  const showModalHandler = (id) => {
    meal = meals.find((meal) => meal.id === id);
    setClickedMeal(meal);
    setShowModal(true);
  };

  const closeModalHandler = () => {
    setShowModal(false);
    setClickedMeal({});
    setOrderCount(1);
  };

  const addToOrderHandler = () => {
    clickedMeal.qty = orderCount;
    console.log(clickedMeal);
    dispatch(cartActions.addToCartMeal(clickedMeal));
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
              <h3>
                {clickedMeal.name} (${Number(clickedMeal.price).toFixed(2)})
              </h3>
              <p>{clickedMeal.ingredients}</p>
              <p>
                {clickedMeal.is_vegan && (
                  <span>
                    <i className='fas fa-check'>vegan </i>{' '}
                  </span>
                )}
                {clickedMeal.is_vegeterian && (
                  <span>
                    <i className='fas fa-check'>vegeterian </i>{' '}
                  </span>
                )}
                {clickedMeal.is_gluten_free && (
                  <span>
                    <i className='fas fa-check'>gluten-free </i>{' '}
                  </span>
                )}
                {clickedMeal.is_lactose_free && (
                  <span>
                    <i className='fas fa-check'>lactose-free </i>{' '}
                  </span>
                )}
              </p>
              <div className='modal-row modal-button-container'>
                <div className='modal-row'>
                  <button
                    disabled={orderCount <= 1}
                    onClick={() => setOrderCount(orderCount - 1)}
                    className='order-count-item order-count-btn'
                  >
                    <span>
                      <i className='fas fa-minus fa-xs'></i>
                    </span>
                  </button>
                  <div className='order-count-item'>
                    <span>{orderCount}</span>
                  </div>
                  <button
                    onClick={() => setOrderCount(orderCount + 1)}
                    className='order-count-item order-count-btn'
                  >
                    <span>
                      <i className='fas fa-plus fa-xs'></i>
                    </span>
                  </button>
                </div>

                <div>
                  <button
                    onClick={addToOrderHandler}
                    className='btn-primary action-btn btn-sm'
                  >
                    Add {orderCount} to order
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
