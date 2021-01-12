import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import Loading from '../../components/Loading';
import AlertBox from '../../components/AlertBox';
import Title from '../../components/Title';
import * as menuActions from '../../store/actions/menu';
import {
  MEAL_CREATE_RESET,
  MEAL_UPDATE_RESET,
} from '../../store/reducers/menu';

const EditMealScreen = ({ match, history }) => {
  const mealId = match.params.id;

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  const [duration, setDuration] = useState(0);
  const [ingredients, setIngredients] = useState('');
  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegeterian, setIsVegeterian] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);

  const dispatch = useDispatch();

  const mealDetails = useSelector((state) => state.mealDetails);
  const { loading, meal, error } = mealDetails;

  const mealCreate = useSelector((state) => state.mealCreate);
  const {
    loading: loadingCreate,
    success: successCreate,
    error: errorCreate,
  } = mealCreate;

  const mealUpdate = useSelector((state) => state.mealUpdate);
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = mealUpdate;

  useEffect(() => {
    if (successCreate || successUpdate) {
      dispatch({ type: mealId ? MEAL_UPDATE_RESET : MEAL_CREATE_RESET });
      history.push('/admin/meallist');
    } else if (mealId) {
      dispatch(menuActions.listMealDetails(mealId));
    }
  }, [dispatch, mealId, history, successUpdate, successCreate]);

  useEffect(() => {
    if (meal && mealId) {
      setName(meal.name);
      setCategory(meal.category);
      setPrice(Number(meal.price));
      setImageUrl(meal.imageurl);
      setDuration(Number(meal.duration));
      setIngredients(meal.ingredients);
      setIsGlutenFree(meal.is_gluten_free);
      setIsVegan(meal.is_vegan);
      setIsVegeterian(meal.is_vegeterian);
      setIsLactoseFree(meal.is_lactose_free);
    }
  }, [meal, mealId]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (mealId) {
      dispatch(
        menuActions.updateMeal({
          id: mealId,
          name,
          category,
          price,
          imageUrl,
          duration,
          isGlutenFree,
          isVegan,
          isVegeterian,
          isLactoseFree,
          ingredients,
        })
      );
    } else {
      dispatch(
        menuActions.createMeal({
          name,
          category,
          price,
          imageUrl,
          duration,
          isGlutenFree,
          isVegan,
          isVegeterian,
          isLactoseFree,
          ingredients,
        })
      );
    }
  };

  const alertCloseHandler = () => {
    dispatch({ type: mealId ? MEAL_UPDATE_RESET : MEAL_CREATE_RESET });
  };

  if (loading || loadingCreate || loadingUpdate) {
    return <Loading />;
  }

  if (error) {
    return <AlertBox message={'Error! ' + error} noBtn />;
  }

  return (
    <div className='edit-form-screen'>
      <div style={{ paddingBottom: '1em' }}>
        <Link to='/admin/meallist' className='btn-primary btn-no-color'>
          go back
        </Link>
      </div>
      <Title title={mealId ? 'Edit meal' : 'Create meal'} />
      {((mealId && errorUpdate) || (!mealId && errorCreate)) && (
        <AlertBox
          message={mealId ? errorUpdate : errorCreate}
          onClose={alertCloseHandler}
        />
      )}

      <form onSubmit={submitHandler} className='form-container'>
        <div className='form-group'>
          <label htmlFor='name'>Meal Name:</label>
          <input
            type='text'
            name='name'
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='form-control'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='category'>Category:</label>
          <input
            type='text'
            name='category'
            id='category'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className='form-control'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='price'>Price:</label>
          <input
            type='number'
            name='price'
            id='price'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className='form-control'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='imageUrl'>Image:</label>
          <input
            type='text'
            name='imageUrl'
            id='imageUrl'
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className='form-control'
          />
        </div>
        {/* <div className='form-group'>
        <label htmlFor='images'>Images:</label>
        {uploading && Loading}
        <input
          type='file'
          name='images'
          id='images'
          multiple
          onChange={uploadFileHandler}
          className='form-control'
        />
        <ul className='extra-list'>
          {images.map((item, index) => (
            <li key={index}>- {item}</li>
          ))}
        </ul>
      </div> */}
        <div className='form-group'>
          <label htmlFor='capacity'>Duration to Cook (in min):</label>
          <input
            type='number'
            name='duration'
            id='duration'
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className='form-control'
          />
        </div>

        <div className='form-group'>
          <label htmlFor='ingredients'>Key Ingredients:</label>
          <input
            type='text'
            name='ingredients'
            id='ingredients'
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className='form-control'
          />
        </div>

        <div className='form-group'>
          <div className='single-extra'>
            <input
              type='checkbox'
              name='vegan'
              id='vegan'
              checked={isVegan}
              onChange={(e) => setIsVegan(e.target.checked)}
            />
            <label htmlFor='vegan'>vegan</label>
          </div>
          <div className='single-extra'>
            <input
              type='checkbox'
              name='vegeterian'
              id='vegeterian'
              checked={isVegeterian}
              onChange={(e) => setIsVegeterian(e.target.checked)}
            />
            <label htmlFor='pets'>vegeterian</label>
          </div>
          <div className='single-extra'>
            <input
              type='checkbox'
              name='glutenFree'
              id='glutenFree'
              checked={isGlutenFree}
              onChange={(e) => setIsGlutenFree(e.target.checked)}
            />
            <label htmlFor='glutenFree'>gluten-free</label>
          </div>
          <div className='single-extra'>
            <input
              type='checkbox'
              name='lactoseFree'
              id='lactoseFree'
              checked={isLactoseFree}
              onChange={(e) => setIsLactoseFree(e.target.checked)}
            />
            <label htmlFor='lactoseFree'>lactose-free</label>
          </div>
        </div>

        <div className='form-group'>
          <button type='submit' className='btn-primary'>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditMealScreen;
