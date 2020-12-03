import React, { useEffect, useReducer } from 'react';
import { useDispatch } from 'react-redux';

import Title from './Title';
import * as roomsActions from '../store/actions/rooms';

const FORM_FILTER_UPDATE = 'FORM_FILTER_UPDATE';

const formReducer = (state, action) => {
  switch (action.type) {
    case FORM_FILTER_UPDATE:
      const updatedValues = {
        ...state,
        [action.name]: action.value,
      };
      return updatedValues;
    default:
      return state;
  }
};

// get all unique values
const getUnique = (items, value) => {
  return [...new Set(items.map((item) => item[value]))];
};

// MAIN COMPONENT
const RoomsFilter = ({ rooms }) => {
  const dispatch = useDispatch();

  const maxPrice = Math.max(...rooms.map((item) => item.price));
  const maxSize = Math.max(...rooms.map((item) => item.size));

  const [formState, dispatchFormState] = useReducer(formReducer, {
    type: 'all',
    capacity: 1,
    price: maxPrice,
    minPrice: 0,
    maxPrice: maxPrice,
    minSize: 0,
    maxSize: maxSize,
    breakfast: false,
    pets: false,
  });

  // get unique types
  let types = getUnique(rooms, 'type');
  // add all
  types = ['all', ...types];

  //get unique room capacity option
  const people = getUnique(rooms, 'capacity');

  useEffect(() => {
    dispatch(
      roomsActions.filterRooms(
        formState.type,
        +formState.capacity,
        +formState.price,
        +formState.maxPrice,
        +formState.minSize,
        +formState.maxSize,
        formState.breakfast,
        formState.pets
      )
    );
  }, [dispatch, formState]);

  const inputChangeHandler = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    dispatchFormState({ type: FORM_FILTER_UPDATE, name: name, value: value });
  };

  return (
    <section className='filter-container'>
      <Title title='filter rooms' />
      <form id='filter-form'>
        {/* select type */}
        <div className='form-group'>
          <label htmlFor='type'>room type</label>
          <select
            name='type'
            id='type'
            value={formState.type}
            onChange={inputChangeHandler}
            className='form-control'
          >
            {types.map((item, idx) => (
              <option key={idx} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        {/* end of select type */}
        {/* guests */}
        <div className='form-group'>
          <label htmlFor='type'>Guests</label>
          <select
            name='capacity'
            id='capacity'
            value={formState.capacity}
            onChange={inputChangeHandler}
            className='form-control'
          >
            {people.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        {/* end of guests */}
        {/* room price */}
        <div className='form-group'>
          <label htmlFor='price'>room price ${formState.price}</label>
          <input
            type='range'
            name='price'
            min={formState.minPrice}
            max={formState.maxPrice}
            id='price'
            value={formState.price}
            onChange={inputChangeHandler}
            className='form-control'
          />
        </div>
        {/* end of room price */}
        {/* size */}
        <div className='form-group'>
          <label htmlFor='size'>room size</label>
          <div className='size-inputs'>
            <input
              type='number'
              name='minSize'
              id='size'
              value={formState.minSize}
              onChange={inputChangeHandler}
              className='size-input'
            />
            <input
              type='number'
              name='maxSize'
              id='size'
              value={formState.maxSize}
              onChange={inputChangeHandler}
              className='size-input'
            />
          </div>
        </div>
        {/* end of size */}
        {/* extras */}
        <div className='form-group'>
          <div className='single-extra'>
            <input
              type='checkbox'
              name='breakfast'
              id='breakfast'
              checked={formState.breakfast}
              onChange={inputChangeHandler}
            />
            <label htmlFor='breakfast'>breakfast</label>
          </div>
          <div className='single-extra'>
            <input
              type='checkbox'
              name='pets'
              id='pets'
              checked={formState.pets}
              onChange={inputChangeHandler}
            />
            <label htmlFor='pets'>pets</label>
          </div>
        </div>
        {/* end of extras */}
      </form>
    </section>
  );
};

export default RoomsFilter;
