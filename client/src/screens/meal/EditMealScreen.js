import React, { useEffect, useState, useCallback, useReducer } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import Loading from '../../components/Loading';
import AlertBox from '../../components/AlertBox';
import Title from '../../components/Title';
import Input from '../../components/Input';
import * as menuActions from '../../store/actions/menu';
import {
  MEAL_CREATE_RESET,
  MEAL_UPDATE_RESET,
  MEAL_DETAILS_RESET,
} from '../../store/reducers/menu';
import customFormReducer from '../../reusableFunctions/formReducer';

const API_URI = process.env.REACT_APP_API_URI;

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  return customFormReducer(state, action, FORM_INPUT_UPDATE);
};

const EditMealScreen = ({ match, history }) => {
  const mealId = match.params.id;

  const [uploading, setUploading] = useState(false);
  const [errorUpload, setErrorUpload] = useState(null);
  const [showError, setShowError] = useState(false);

  const dispatch = useDispatch();

  const mealDetails = useSelector((state) => state.mealDetails);
  let { loading, meal, error } = mealDetails;

  if (!mealId) {
    meal = null;
  }

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

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      name: '',
      category: '',
      price: 0,
      imageUrl: '',
      duration: 0,
      ingredients: '',
      isGlutenFree: false,
      isVegan: false,
      isVegeterian: false,
      isLactoseFree: false,
    },
    inputValidities: {
      name: false,
      category: false,
      price: true,
      imageUrl: false,
      duration: true,
      ingredients: false,
      isGlutenFree: true,
      isVegan: true,
      isVegeterian: true,
      isLactoseFree: true,
    },
    formIsValid: meal ? true : false,
  });

  console.log(formState.inputValues);

  useEffect(() => {
    if (successCreate || successUpdate) {
      dispatch({ type: mealId ? MEAL_UPDATE_RESET : MEAL_CREATE_RESET });
      history.push('/admin/meallist');
    } else if (mealId) {
      dispatch(menuActions.listMealDetails(mealId));
    } else {
      dispatch({ type: MEAL_DETAILS_RESET });
    }
  }, [dispatch, mealId, history, successUpdate, successCreate]);

  useEffect(() => {
    if (mealId && meal) {
      const type = FORM_INPUT_UPDATE;
      const isValid = true;
      dispatchFormState({ type, input: 'name', value: meal.name, isValid });
      dispatchFormState({
        type,
        input: 'category',
        value: meal.category,
        isValid,
      });
      dispatchFormState({
        type,
        input: 'price',
        value: Number(meal.price),
        isValid,
      });
      dispatchFormState({
        type,
        input: 'imageUrl',
        value: meal.imageurl,
        isValid,
      });
      dispatchFormState({
        type,
        input: 'duration',
        value: Number(meal.duration),
        isValid,
      });
      dispatchFormState({
        type,
        input: 'ingredients',
        value: meal.ingredients,
        isValid,
      });
      dispatchFormState({
        type,
        input: 'isGlutenFree',
        value: meal.is_gluten_free,
        isValid,
      });
      dispatchFormState({
        type,
        input: 'isVegan',
        value: meal.is_vegan,
        isValid,
      });
      dispatchFormState({
        type,
        input: 'isVegeterian',
        value: meal.is_vegeterian,
        isValid,
      });
      dispatchFormState({
        type,
        input: 'isLactoseFree',
        value: meal.is_lactose_free,
        isValid,
      });
    }
  }, [mealId, meal]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!formState.formIsValid) {
      alert('Form Validation Failed!');
      setShowError(true);
      return;
    }

    const {
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
    } = formState.inputValues;

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

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        input: inputIdentifier,
        isValid: inputValidity,
        value: inputValue,
      });
    },
    [dispatchFormState]
  );

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('mealImage', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      };

      const { data } = await axios.post(
        `${API_URI}/api/upload/meal`,
        formData,
        config
      );

      inputChangeHandler('imageUrl', data, true);
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
      setErrorUpload(error);
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
          <Input
            label='Meal Name: '
            type='text'
            name='name'
            errorText='Not valid name!'
            onInputChange={inputChangeHandler}
            initialValue={meal ? meal.name : ''}
            initiallyValid={meal ? true : false}
            required
            showError={showError}
          />
        </div>

        <div className='form-group'>
          <Input
            label='Category: '
            type='text'
            name='category'
            errorText='Not valid category!'
            onInputChange={inputChangeHandler}
            initialValue={meal ? meal.category : ''}
            initiallyValid={meal ? true : false}
            required
            showError={showError}
          />
        </div>

        <div className='form-group'>
          <Input
            label='Price: '
            type='number'
            name='price'
            errorText='Not valid price!'
            onInputChange={inputChangeHandler}
            initialValue={meal ? meal.price : 0}
            initiallyValid={true}
            required
            showError={showError}
          />
        </div>

        <div className='form-group' style={{ paddingBottom: '1em' }}>
          <Input
            label='Image: '
            type='text'
            name='imageUrl'
            errorText='Not valid image url!'
            onInputChange={inputChangeHandler}
            initialValue={meal ? meal.imageurl : ''}
            initiallyValid={meal ? true : false}
            required
            minLength={5}
            showError={showError}
          />
          {uploading && <Loading small />}
          {errorUpload && <AlertBox message={`Error! ` + errorUpload} />}
          <input type='file' name='imageUrl' onChange={uploadFileHandler} />
        </div>

        <div className='form-group'>
          <Input
            label='Duration to Cook (in mins): '
            type='number'
            name='duration'
            errorText='Not Valid duration!'
            onInputChange={inputChangeHandler}
            initialValue={meal ? meal.duration : 0}
            initiallyValid={true}
            required
            showError={showError}
          />
        </div>

        <div className='form-group'>
          <Input
            label='Key Ingredients: '
            type='text'
            name='ingredients'
            errorText='Not valid ingredients!'
            onInputChange={inputChangeHandler}
            initialValue={meal ? meal.ingredients : ''}
            initiallyValid={meal ? true : false}
            required
            minLength={10}
            showError={showError}
          />
        </div>

        <div className='form-group'>
          <div className='single-extra'>
            <input
              type='checkbox'
              name='isVegan'
              checked={formState.inputValues.isVegan}
              onChange={(e) =>
                inputChangeHandler('isVegan', e.target.checked, true)
              }
            />
            <label htmlFor='vegan'>vegan</label>
          </div>
          <div className='single-extra'>
            <input
              type='checkbox'
              name='isVegeterian'
              checked={formState.inputValues.isVegeterian}
              onChange={(e) =>
                inputChangeHandler('isVegeterian', e.target.checked, true)
              }
            />
            <label htmlFor='pets'>vegeterian</label>
          </div>
          <div className='single-extra'>
            <input
              type='checkbox'
              name='isGlutenFree'
              checked={formState.inputValues.isGlutenFree}
              onChange={(e) =>
                inputChangeHandler('isGlutenFree', e.target.checked, true)
              }
            />
            <label htmlFor='glutenFree'>gluten-free</label>
          </div>
          <div className='single-extra'>
            <input
              type='checkbox'
              name='isLactoseFree'
              checked={formState.inputValues.isLactoseFree}
              onChange={(e) =>
                inputChangeHandler('isLactoseFree', e.target.checked, true)
              }
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
