import React, { useEffect, useReducer, useState } from 'react';
import { useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import Title from './Title';
import * as roomsActions from '../store/actions/rooms';

const FORM_FILTER_UPDATE = 'FORM_FILTER_UPDATE';
const FORM_FILTER_RESET = 'FORM_FILTER_RESET';

const formReducer = (state, action) => {
  switch (action.type) {
    case FORM_FILTER_UPDATE:
      const updatedValues = {
        ...state,
        [action.name]: action.value,
      };
      return updatedValues;
    case FORM_FILTER_RESET:
      const initialValues = {
        type: 'all',
        capacity: 1,
        price: action.maxPrice,
        minPrice: 0,
        maxPrice: action.maxPrice,
        minSize: 0,
        maxSize: action.maxSize,
        breakfast: false,
        pets: false,
      };
      return initialValues;
    default:
      return state;
  }
};

// get all unique values
const getUnique = (items, value) => {
  return [...new Set(items.map((item) => item[value]))];
};

// MAIN COMPONENT
const RoomsFilter = ({ rooms, filters }) => {
  const maxPrice = Math.max(...rooms.map((item) => item.price));
  const maxSize = Math.max(...rooms.map((item) => item.size));

  const [checkInDate, setCheckInDate] = useState(
    filters.checkInDate ? filters.checkInDate : null
  );
  const [checkOutDate, setCheckOutDate] = useState(
    filters.checkOutDate ? filters.checkOutDate : null
  );

  const [formState, dispatchFormState] = useReducer(formReducer, {
    type: filters.type ? filters.type : 'all',
    capacity: filters.capacity ? filters.capacity : 1,
    price: filters.price ? filters.price : maxPrice,
    minPrice: 0,
    maxPrice: maxPrice,
    minSize: filters.minSize ? filters.minSize : 0,
    maxSize: filters.maxSize ? filters.maxSize : maxSize,
    breakfast: filters.breakfast ? true : false,
    pets: filters.pets ? true : false,
  });

  // get unique types
  let types = getUnique(rooms, 'type');
  // add all
  types = ['all', ...types];

  //get unique room capacity option
  const people = getUnique(rooms, 'capacity');

  const dispatch = useDispatch();

  useEffect(() => {
    // if (isFinite(maxPrice)) {
    dispatch(
      roomsActions.filterRooms(
        formState.type,
        +formState.capacity,
        +formState.price,
        +formState.maxPrice,
        +formState.minSize,
        +formState.maxSize,
        formState.breakfast,
        formState.pets,
        checkInDate,
        checkOutDate
      )
    );
    // }
  }, [dispatch, formState, checkInDate, checkOutDate, maxPrice]);

  const inputChangeHandler = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    dispatchFormState({ type: FORM_FILTER_UPDATE, name: name, value: value });
  };

  const resetFiltersHandler = () => {
    dispatchFormState({ type: FORM_FILTER_RESET, maxSize, maxPrice });
    setCheckInDate(null);
    setCheckOutDate(null);
  };

  return (
    <section className='filter-container'>
      <Title title='filter rooms' />
      <form id='filter-form'>
        <div>
          <label htmlFor='date'>Check-in :</label>{' '}
          <DatePicker
            selected={checkInDate}
            onChange={(date) => setCheckInDate(date)}
            className='date-input'
          />
          <label htmlFor='date'>Check-out :</label>{' '}
          <DatePicker
            selected={checkOutDate}
            onChange={(date) => setCheckOutDate(date)}
            className='date-input'
          />
        </div>
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
        <button type='button' className='btn-sm' onClick={resetFiltersHandler}>
          reset my filters
        </button>
      </form>
    </section>
  );
};

export default RoomsFilter;
