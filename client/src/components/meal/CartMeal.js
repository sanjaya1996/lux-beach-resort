import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import * as cartActions from '../../store/actions/cart';

const CartMeal = ({ meal }) => {
  const [orderCount, setOrderCount] = useState(meal.qty);

  const dispatch = useDispatch();

  const removeFromCartHandler = (id) => {
    dispatch(cartActions.removeFromCartMeal(id));
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
            <label htmlFor='date'>
              total : ${Number(orderCount * meal.price).toFixed(2)}
            </label>
          </div>
          <Link to={`/meal/${meal.id}/orderpayment?qty=${orderCount}`}>
            <button className='btn-primary action-btn'>Select</button>
          </Link>
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
