import React, { useReducer } from 'react';

import Title from './Title';

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

const RoomsFilter = ({ rooms }) => {
  const [formState, dispatchFormState] = useReducer(formReducer, {
    type: 'all',
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false,
  });

  // get unique types
  let types = getUnique(rooms, 'type');
  // add all
  types = ['all', ...types];

  const inputChangeHandler = (event) => {
    const target = event.target;
    const value = event.type === 'checkbox' ? target.checked : target.value;
    const name = event.target.name;

    dispatchFormState({ type: FORM_FILTER_UPDATE, name: name, value: value });
  };

  return (
    <section className='filter-container'>
      <Title title='filter rooms' />
      <form className='filter-form'>
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
      </form>
    </section>
  );
};

export default RoomsFilter;
