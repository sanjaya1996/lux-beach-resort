import React, { useState } from 'react';
import axios from 'axios';

import Loading from '../components/Loading';

const EditRoomScreen = () => {
  const [uploading, setUploading] = useState(false);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState(0);
  const [size, setSize] = useState(0);
  const [capacity, setCapacity] = useState(0);
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState('');
  const [extra, setExtra] = useState('');
  const [extraList, setExtraList] = useState([]);
  const [pets, setPets] = useState(false);
  const [breakfast, setBreakfast] = useState(false);
  const [featured, setFeatured] = useState(false);

  // const inputChangeHandler = (event) => {
  //   console.log(event.target.value);
  // };

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

      const { data } = await axios.post('/api/uploads', formData, config);

      setImages(data);
      setUploading(false);
    } catch (err) {
      console.log(err);
      setUploading(false);
    }
  };

  const deleteExtraHandler = (index) => {
    setExtraList(extraList.filter((item, i) => i !== index));
  };

  return (
    <div className='edit-room'>
      <form className='form-container'>
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
              onClick={() => setExtraList((prevState) => [...prevState, extra])}
            >
              Add to list
            </button>
          </div>
          <ul className='extra-list'>
            {extraList.map((item, index) => (
              <li key={index} onClick={() => deleteExtraHandler(index)}>
                - {item}
              </li>
            ))}
          </ul>
          {extraList.length > 0 && (
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
