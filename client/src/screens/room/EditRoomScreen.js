import React, { useEffect, useState, useReducer, useCallback } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import Loading from '../../components/Loading';
import * as roomActions from '../../store/actions/rooms';
import {
  ROOM_CREATE_RESET,
  ROOM_UPDATE_RESET,
} from '../../store/reducers/rooms';
import AlertBox from '../../components/AlertBox';
import Title from '../../components/Title';
import Input from '../../components/Input';
import customFormReducer from '../../reusableFunctions/formReducer';

const API_URI = process.env.REACT_APP_API_URI;

const errorTextStyles = {
  padding: 0,
  fontWeight: 'normal',
  fontStyle: 'italic',
  fontSize: '0.6rem',
  color: 'red',
};

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  return customFormReducer(state, action, FORM_INPUT_UPDATE);
};

const EditRoomScreen = ({ match, history }) => {
  const roomId = match.params.id;

  const [uploading, setUploading] = useState(false);
  const [showError, setShowError] = useState(false);

  const dispatch = useDispatch();

  const roomDetails = useSelector((state) => state.roomDetails);
  let { loading, room, error } = roomDetails;

  if (!roomId) {
    room = null;
  }

  const roomCreate = useSelector((state) => state.roomCreate);
  const {
    loading: loadingCreate,
    success: successCreate,
    error: errorCreate,
  } = roomCreate;

  const roomUpdate = useSelector((state) => state.roomUpdate);
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = roomUpdate;

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      name: '',
      type: '',
      price: '',
      size: 0,
      capacity: 1,
      images: [],
      description: '',
      extra: '',
      extras: [],
      pets: false,
      breakfast: false,
      featured: false,
    },
    inputValidities: {
      name: false,
      type: false,
      price: true,
      size: false,
      capacity: true,
      images: false,
      pets: true,
      breakfast: true,
      featured: true,
    },
    formIsValid: false,
  });

  useEffect(() => {
    if (successCreate || successUpdate) {
      dispatch({ type: roomId ? ROOM_UPDATE_RESET : ROOM_CREATE_RESET });
      history.push('/admin/roomlist');
    } else if (roomId) {
      dispatch(roomActions.listRoomDetails(roomId));
    }
  }, [dispatch, roomId, history, successUpdate, successCreate]);

  useEffect(() => {
    if (room && roomId) {
      const type = FORM_INPUT_UPDATE;
      const isValid = true;
      const { id, is_booked, ...otherValues } = room;
      for (const key of Object.keys(otherValues)) {
        dispatchFormState({
          type,
          input: key,
          isValid,
          value: otherValues[key],
        });
      }
    }
  }, [room, roomId]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!formState.formIsValid) {
      alert('Form Validation Failed!');
      setShowError(true);
      return;
    }
    const {
      name,
      type,
      price,
      size,
      capacity,
      images,
      description,
      extras,
      pets,
      breakfast,
      featured,
    } = formState.inputValues;
    if (roomId) {
      dispatch(
        roomActions.updateRoom({
          id: roomId,
          name,
          type,
          price,
          size,
          capacity,
          images,
          description,
          extras,
          pets,
          breakfast,
          featured,
        })
      );
    } else {
      dispatch(
        roomActions.createRoom({
          name,
          type,
          price,
          size,
          capacity,
          images,
          description,
          extras,
          pets,
          breakfast,
          featured,
        })
      );
    }
  };

  const { extras } = formState.inputValues;

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      let value = inputValue;

      if (inputIdentifier === 'extras') {
        value = [...formState.inputValues[inputIdentifier], inputValue];
      }

      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        input: inputIdentifier,
        isValid: inputValidity,
        value,
      });
    },
    // eslint-disable-next-line
    [dispatchFormState, extras]
  );

  const uploadFileHandler = async (e) => {
    const files = e.target.files;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('roomImages', files[i]);
    }
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      };

      const { data } = await axios.post(
        `${API_URI}/api/upload/roomimages`,
        formData,
        config
      );
      console.log(data);
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        input: 'images',
        isValid: true,
        value: data,
      });
      setUploading(false);
    } catch (err) {
      console.log(err);
      setUploading(false);
    }
  };

  const deleteExtraHandler = (index) => {
    let isValid = true;
    const value = formState.inputValues.extras.filter((item, i) => i !== index);
    if (value.length === 0) {
      isValid = false;
    }

    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      input: 'extras',
      isValid,
      value,
    });
  };

  const alertCloseHandler = () => {
    dispatch({ type: roomId ? ROOM_UPDATE_RESET : ROOM_CREATE_RESET });
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
        <Link to='/admin/roomlist' className='btn-primary btn-no-color'>
          go back
        </Link>
      </div>
      <Title title={roomId ? 'Edit room' : 'Create room'} />
      {((roomId && errorUpdate) || (!roomId && errorCreate)) && (
        <AlertBox
          message={roomId ? errorUpdate : errorCreate}
          onClose={alertCloseHandler}
        />
      )}

      <form onSubmit={submitHandler} className='form-container'>
        <div className='form-group'>
          <Input
            label='Room Name: '
            type='text'
            name='name'
            errorText='Not valid name!'
            onInputChange={inputChangeHandler}
            initialValue={room ? room.name : ''}
            initiallyValid={room ? true : false}
            required
            showError={showError}
          />
        </div>

        <div className='form-group'>
          <Input
            label='Room Type: '
            type='text'
            name='type'
            errorText='Not valid type!'
            onInputChange={inputChangeHandler}
            initialValue={room ? room.type : ''}
            initiallyValid={room ? true : false}
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
            initialValue={room ? room.price : 0}
            initiallyValid={true}
            required
            showError={showError}
          />
        </div>

        <div className='form-group'>
          <Input
            label='Room Size: '
            type='number'
            name='size'
            errorText='Not valid room size!'
            onInputChange={inputChangeHandler}
            initialValue={room ? room.size : 0}
            initiallyValid={room ? true : false}
            required
            showError={showError}
          />
        </div>

        <div className='form-group'>
          <Input
            label='Capacity: '
            type='number'
            name='capacity'
            errorText='Not valid capacity!'
            onInputChange={inputChangeHandler}
            initialValue={room ? room.capacity : 1}
            initiallyValid={true}
            required
            showError={showError}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='images'>
            Images:{' '}
            {showError && !formState.inputValidities.images && (
              <span style={errorTextStyles}>Not valid images!</span>
            )}
          </label>
          {uploading && <Loading small />}
          <input
            type='file'
            name='images'
            id='images'
            multiple
            onChange={uploadFileHandler}
            className='form-control'
          />
          <ul className='extra-list'>
            {formState.inputValues.images.map((item, index) => (
              <li key={index}>- {item}</li>
            ))}
          </ul>
        </div>

        <div className='form-group'>
          <label htmlFor='extra'>
            Extras:{' '}
            {showError && !formState.inputValidities.extras && (
              <span style={errorTextStyles}>Not valid extra list!</span>
            )}
          </label>
          <div className='extras-input'>
            <input
              type='text'
              name='extra'
              id='extra'
              value={formState.inputValues.extra}
              multiple
              onChange={(e) =>
                inputChangeHandler('extra', e.target.value, true)
              }
              className='form-control'
            />
            <button
              type='button'
              style={{ width: 'auto' }}
              onClick={() => {
                if (formState.inputValues.extra.trim().length === 0) {
                  return;
                }
                inputChangeHandler('extras', formState.inputValues.extra, true);
              }}
            >
              Add to list
            </button>
          </div>
          <ul className='extra-list'>
            {formState.inputValues.extras.map((item, index) => (
              <li key={index} onClick={() => deleteExtraHandler(index)}>
                - {item}
              </li>
            ))}
          </ul>
          {formState.inputValues.extras.length > 0 && (
            <p className='note'>
              <i>*click an item to remove*</i>
            </p>
          )}
        </div>

        <div className='form-group'>
          <Input
            label='Description: '
            type='textarea'
            name='description'
            errorText='Not valid description!'
            onInputChange={inputChangeHandler}
            initialValue={room ? room.description : ''}
            initiallyValid={room ? true : false}
            required
            minLength={10}
            showError={showError}
          />
        </div>
        <div className='form-group'>
          <div className='single-extra'>
            <input
              type='checkbox'
              name='breakfast'
              id='breakfast'
              checked={formState.inputValues.breakfast}
              onChange={(e) =>
                inputChangeHandler('breakfast', e.target.checked, true)
              }
            />
            <label htmlFor='breakfast'>breakfast</label>
          </div>
          <div className='single-extra'>
            <input
              type='checkbox'
              name='pets'
              id='pets'
              checked={formState.inputValues.pets}
              onChange={(e) =>
                inputChangeHandler('pets', e.target.checked, true)
              }
            />
            <label htmlFor='pets'>pets</label>
          </div>
          <div className='single-extra'>
            <input
              type='checkbox'
              name='featured'
              id='featured'
              checked={formState.inputValues.featured}
              onChange={(e) =>
                inputChangeHandler('featured', e.target.checked, true)
              }
            />
            <label htmlFor='featured'>Featured</label>
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

export default EditRoomScreen;
