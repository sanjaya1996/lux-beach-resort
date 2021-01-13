import React, { useEffect, useReducer } from 'react';
import { useDispatch } from 'react-redux';

import Title from '../Title';
import {
  MEAL_LIST_FILTER,
  MEAL_LIST_FILTER_RESET,
} from '../../store/reducers/menu';

const FORM_FILTER_UPDATE = 'FORM_FILTER_UPDATE';
const FORM_FILTER_RESET = 'FORM_FILTER_RESET';

const formReducer = (state, action) => {
  switch (action.type) {
    case FORM_FILTER_UPDATE:
      return { ...state, [action.name]: action.value };
    case FORM_FILTER_RESET:
      return {
        category: 'all',
        price: action.price,
        vegan: false,
        vegeterian: false,
        glutenFree: false,
        lactoseFree: false,
      };
    default:
      return state;
  }
};

const getUnique = (items, value) => {
  return [...new Set(items.map((item) => item[value]))];
};

// MAIN COMPONENT STARTS HERE
const MealsFilter = ({ meals }) => {
  const dispatch = useDispatch();

  const maxPrice = Math.max(...meals.map((item) => item.price));
  // get unique categories
  let categories = getUnique(meals, 'category');
  // add all
  categories = ['all', ...categories];

  const [formState, dispatchFormState] = useReducer(formReducer, {
    category: 'all',
    price: maxPrice,
    vegan: false,
    vegeterian: false,
    glutenFree: false,
    lactoseFree: false,
  });

  useEffect(() => {
    dispatch({
      type: MEAL_LIST_FILTER,
      payload: {
        category: formState.category,
        price: formState.price,
        maxPrice,
        vegan: formState.vegan,
        vegeterian: formState.vegeterian,
        glutenFree: formState.glutenFree,
        lactoseFree: formState.lactoseFree,
      },
    });
  }, [formState, dispatch, maxPrice]);

  const inputChangeHandler = (e) => {
    const { name } = e.target;
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    dispatchFormState({ type: FORM_FILTER_UPDATE, name, value });
  };

  const resetFilterHandler = () => {
    dispatchFormState({ type: FORM_FILTER_RESET, price: maxPrice });
    dispatch({ type: MEAL_LIST_FILTER_RESET });
  };

  return (
    <section className='filter-container'>
      <Title title='filter Meals' />
      <form id='filter-form'>
        {/* select category */}
        <div className='form-group'>
          <label htmlFor='category'>Your Choice</label>
          <select
            name='category'
            id='category'
            value={formState.category}
            onChange={(e) => inputChangeHandler(e)}
            className='form-control'
          >
            {categories.map((item, idx) => (
              <option key={idx} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        {/* end of select type */}

        {/* room price */}
        <div className='form-group'>
          <label htmlFor='price'>meal price ${formState.price}</label>
          <input
            type='range'
            name='price'
            min={0}
            max={Math.ceil(maxPrice)}
            id='price'
            value={formState.price}
            onChange={(e) => inputChangeHandler(e)}
            className='form-control'
          />
        </div>
        {/* end of room price */}

        {/* extras */}
        <div className='form-group'>
          <div className='single-extra'>
            <input
              type='checkbox'
              name='vegan'
              id='vegan'
              checked={formState.vegan}
              onChange={(e) => inputChangeHandler(e)}
            />
            <label htmlFor='vegan'>vegan</label>
          </div>
          <div className='single-extra'>
            <input
              type='checkbox'
              name='vegeterian'
              id='vegeterian'
              checked={formState.vegeterian}
              onChange={(e) => inputChangeHandler(e)}
            />
            <label htmlFor='pets'>vegeterian</label>
          </div>
          <div className='single-extra'>
            <input
              type='checkbox'
              name='glutenFree'
              id='glutenFree'
              checked={formState.glutenFree}
              onChange={(e) => inputChangeHandler(e)}
            />
            <label htmlFor='glutenFree'>gluten-free</label>
          </div>
          <div className='single-extra'>
            <input
              type='checkbox'
              name='lactoseFree'
              id='lactoseFree'
              checked={formState.lactoseFree}
              onChange={(e) => inputChangeHandler(e)}
            />
            <label htmlFor='lactoseFree'>lactose-free</label>
          </div>
        </div>
        {/* end of extras */}
        <button type='button' onClick={resetFilterHandler} className='btn-sm'>
          reset my filters
        </button>
      </form>
    </section>
  );
};

export default MealsFilter;
