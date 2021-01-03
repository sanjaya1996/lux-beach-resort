import React from 'react';

import Title from '../Title';

const MealsFilter = () => {
  return (
    <section className='filter-container'>
      <Title title='filter Meals' />
      <form id='filter-form'>
        {/* select type */}
        <div className='form-group'>
          <label htmlFor='type'>Your Choice</label>
          <select
            name='type'
            id='type'
            // value={formState.type}
            // onChange={inputChangeHandler}
            className='form-control'
          >
            {['All', 'item1', 'item2', 'item3', 'item4'].map((item, idx) => (
              <option key={idx} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        {/* end of select type */}

        {/* room price */}
        <div className='form-group'>
          <label htmlFor='price'>meal price $5</label>
          <input
            type='range'
            name='price'
            // min={formState.minPrice}
            // max={formState.maxPrice}
            id='price'
            // value={formState.price}
            // onChange={inputChangeHandler}
            className='form-control'
          />
        </div>
        {/* end of room price */}

        {/* extras */}
        <div className='form-group'>
          <div className='single-extra'>
            <input
              type='checkbox'
              name='breakfast'
              id='breakfast'
              //   checked={formState.breakfast}
              //   onChange={inputChangeHandler}
            />
            <label htmlFor='breakfast'>vegan</label>
          </div>
          <div className='single-extra'>
            <input
              type='checkbox'
              name='pets'
              id='pets'
              //   checked={formState.pets}
              //   onChange={inputChangeHandler}
            />
            <label htmlFor='pets'>vegeterian</label>
          </div>
          <div className='single-extra'>
            <input
              type='checkbox'
              name='pets'
              id='pets'
              //   checked={formState.pets}
              //   onChange={inputChangeHandler}
            />
            <label htmlFor='pets'>gluten-free</label>
          </div>
          <div className='single-extra'>
            <input
              type='checkbox'
              name='pets'
              id='pets'
              //   checked={formState.pets}
              //   onChange={inputChangeHandler}
            />
            <label htmlFor='pets'>lactose-free</label>
          </div>
        </div>
        {/* end of extras */}
        <button type='button' className='btn-sm'>
          reset my filters
        </button>
      </form>
    </section>
  );
};

export default MealsFilter;
