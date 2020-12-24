import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import Loading from '../components/Loading';
import * as roomActions from '../store/actions/rooms';

const EditRoomScreen = ({ match }) => {
  const roomId = match.params.id;
  console.log(roomId);

  const [uploading, setUploading] = useState(false);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');
  const [size, setSize] = useState('');
  const [capacity, setCapacity] = useState(null);
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState('');
  const [extra, setExtra] = useState('');
  const [extras, setExtras] = useState([]);
  const [pets, setPets] = useState(false);
  const [breakfast, setBreakfast] = useState(false);
  const [featured, setFeatured] = useState(false);

  const dispatch = useDispatch();

  const roomDetails = useSelector((state) => state.roomDetails);
  const { loading, room, error } = roomDetails;

  useEffect(() => {
    if (roomId) {
      dispatch(roomActions.listRoomDetails(roomId));
    }
  }, [dispatch, roomId]);

  useEffect(() => {
    if (room) {
      setName(room.name);
      setType(room.type);
      setPrice(room.price);
      setSize(room.size);
      setCapacity(room.capacity);
      setImages(room.images);
      setExtras(room.extras);
      setDescription(room.description);
      setPets(room.setPets);
      setBreakfast(room.breakfast);
      setFeatured(room.featured);
    }
  }, [room]);

  const submitHandler = (e) => {
    e.preventDefault();
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
  };

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
      };

      const { data } = await axios.post('/api/upload', formData, config);

      setImages(data);
      setUploading(false);
    } catch (err) {
      console.log(err);
      setUploading(false);
    }
  };

  const deleteExtraHandler = (index) => {
    setExtras(extras.filter((item, i) => i !== index));
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className='edit-room'>
      <form onSubmit={submitHandler} className='form-container'>
        <div className='form-group'>
          <label htmlFor='name'>Room Name:</label>
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
          <label htmlFor='type'>Room Type:</label>
          <input
            type='text'
            name='type'
            id='type'
            value={type}
            onChange={(e) => setType(e.target.value)}
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
          <label htmlFor='size'>Size:</label>
          <input
            type='number'
            name='size'
            id='size'
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className='form-control'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='capacity'>Capacity:</label>
          <input
            type='number'
            name='capacity'
            id='capacity'
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            className='form-control'
          />
        </div>
        <div className='form-group'>
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
        </div>
        <div className='form-group'>
          <label htmlFor='extra'>Extras:</label>
          <div className='extras-input'>
            <input
              type='text'
              name='extra'
              id='extra'
              value={extra}
              multiple
              onChange={(e) => setExtra(e.target.value)}
              className='form-control'
            />
            <button
              type='button'
              style={{ width: 'auto' }}
              onClick={() => setExtras((prevState) => [...prevState, extra])}
            >
              Add to list
            </button>
          </div>
          <ul className='extra-list'>
            {extras.map((item, index) => (
              <li key={index} onClick={() => deleteExtraHandler(index)}>
                - {item}
              </li>
            ))}
          </ul>
          {extras.length > 0 && (
            <p className='note'>
              <i>*click an item to remove*</i>
            </p>
          )}
        </div>
        <div className='form-group'>
          <label htmlFor='description'>Description:</label>
          <textarea
            name='description'
            id='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='form-control'
            style={{ height: 100 }}
          />
        </div>
        <div className='form-group'>
          <div className='single-extra'>
            <input
              type='checkbox'
              name='breakfast'
              id='breakfast'
              checked={breakfast}
              onChange={(e) => setBreakfast(e.target.checked)}
            />
            <label htmlFor='breakfast'>breakfast</label>
          </div>
          <div className='single-extra'>
            <input
              type='checkbox'
              name='pets'
              id='pets'
              checked={pets}
              onChange={(e) => setPets(e.target.checked)}
            />
            <label htmlFor='pets'>pets</label>
          </div>
          <div className='single-extra'>
            <input
              type='checkbox'
              name='featured'
              id='featured'
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
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
