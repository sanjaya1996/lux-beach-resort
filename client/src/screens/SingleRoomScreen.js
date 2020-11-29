import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Loading from '../components/Loading';
import Banner from '../components/Banner';
import StyledHero from '../components/StyledHero';
import * as roomsActions from '../store/actions/rooms';

const SingleRoomScreen = ({ match }) => {
  const dispatch = useDispatch();

  const roomDetails = useSelector((state) => state.roomDetails);
  const { loading, room, error } = roomDetails;

  useEffect(() => {
    dispatch(roomsActions.listRoomDetails(match.params.id));
  }, [dispatch, match]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className='error'>
        <h3>{error}</h3>
      </div>
    );
  }

  if (!loading & !room) {
    return (
      <div className='error'>
        <h3>no such room could be found...</h3>
        <Link to='/rooms' className='btn-primary'>
          back to rooms
        </Link>
      </div>
    );
  }

  const {
    name,
    description,
    capacity,
    size,
    price,
    extras,
    breakfast,
    pets,
    images,
  } = room;
  const [mainImg, ...defaultImages] = images;

  return (
    <>
      <StyledHero img={mainImg.url}>
        <Banner title={`${name} room`}>
          <Link to='/rooms' className='btn-primary'>
            back to rooms
          </Link>
        </Banner>
      </StyledHero>
      <section className='single-room'>
        <div className='single-room-images'>
          {defaultImages.map((item, index) => (
            <img key={index} src={item.url} alt={name} />
          ))}
        </div>
        <div className='single-room-info'>
          <article className='desc'>
            <h3>details</h3>
            <p>{description}</p>
          </article>
          <article className='info'>
            <h3>info</h3>
            <h6>price : ${price}</h6>
            <h6>size : {size} SQFT</h6>
            <h6>
              max capacity :
              {capacity > 1 ? `${capacity} people` : `${capacity} person`}
            </h6>
            <h6>{pets ? 'pets allowed' : 'no pets allowed'}</h6>
            <h6>{breakfast && 'free breakfast included'}</h6>
          </article>
        </div>
      </section>
      <section className='room-extras'>
        <h6>extras </h6>
        <ul className='extras'>
          {extras.map((item, index) => (
            <li key={index}>- {item}</li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default SingleRoomScreen;
