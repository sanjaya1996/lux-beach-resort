import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import * as cartActions from '../../store/actions/cart';

const CartMeal = ({ meal }) => {
  const dispatch = useDispatch();

  const removeFromCartHandler = (id) => {
    dispatch(cartActions.removeFromCartMeal(id));
  };

  const addToCartHandler = (eventType) => {
    meal.qty =
      eventType === 'increment' ? Number(meal.qty) + 1 : Number(meal.qty) - 1;
    dispatch(cartActions.addToCartMeal(meal));
  };

  return (
    <div className='cart-item'>
      <div className='cart-image'>
        <div className='img-container'>
          <img src={meal.imageurl} alt='single meal' />
          <div className='price-top'>
            <h6>${meal.price}</h6>
          </div>
          <p className='room-info'>{meal.name}</p>
        </div>
      </div>
      <div>
        <div id='filter-form'>
          <div className='modal-row'>
            <button
              disabled={meal.qty <= 1}
              onClick={() => addToCartHandler('decrement')}
              className='order-count-item order-count-btn'
            >
              <span>
                <i className='fas fa-minus fa-xs'></i>
              </span>
            </button>
            <div className='order-count-item'>
              <span>{meal.qty}</span>
            </div>
            <button
              onClick={() => addToCartHandler('increment')}
              className='order-count-item order-count-btn'
            >
              <span>
                <i className='fas fa-plus fa-xs'></i>
              </span>
            </button>
          </div>
          <div>
            <label htmlFor='date'>
              ${Number(meal.qty * meal.price).toFixed(2)}
            </label>
          </div>

          <div>
            <p
              style={{
                textDecoration: 'underline',
                display: 'inline-block',
                color: 'red',
                cursor: 'pointer',
              }}
              onClick={() => removeFromCartHandler(meal.id)}
            >
              <i>Remove</i>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartMeal;
