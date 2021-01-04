import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Loading from '../components/Loading';
import Banner from '../components/Banner';
import StyledHero from '../components/StyledHero';
import * as roomsActions from '../store/actions/rooms';
import * as cartActions from '../store/actions/cart';
import ErrorScreen from './ErrorScreen';
import { CHECK_AVAILABILITY_RESET } from '../store/reducers/rooms';

const SingleRoomScreen = ({ match, history }) => {
  const dispatch = useDispatch();

  const roomDetails = useSelector((state) => state.roomDetails);
  const { loading, room, error } = roomDetails;

  const filters = useSelector((state) => state.roomList.filters);
  const { capacity: filterCapacity, checkInDate, checkOutDate } = filters;

  useEffect(() => {
    dispatch(roomsActions.listRoomDetails(match.params.id));
  }, [dispatch, match]);

  const addToCartHandler = () => {
    dispatch({ type: CHECK_AVAILABILITY_RESET });
    dispatch(
      cartActions.addToCartRoom(
        room.id,
        checkInDate ? checkInDate : null,
        checkOutDate ? checkOutDate : null,
        room.capacity
      )
    );
    history.push('/cart');
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <ErrorScreen title='Error' subtitle={error} redirect='/rooms'>
        return back
      </ErrorScreen>
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
  const mainImgCorrectPath = mainImg.replace('\\', '\\\\');
  return (
    <>
      <StyledHero img={mainImgCorrectPath}>
        <Banner title={`${name} room`}>
          <Link to='/rooms' className='btn-primary'>
            back to rooms
          </Link>
        </Banner>
        <div
          style={{
            position: 'absolute',
            bottom: 20,
            right: 20,
          }}
        >
          <button
            type='button'
            className='btn-primary action-btn'
            onClick={addToCartHandler}
          >
            Book now
          </button>
        </div>
      </StyledHero>
      <section className='single-room'>
        <div className='single-room-images'>
          {defaultImages.map((item, index) => (
            <img key={index} src={item} alt={name} />
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
      <div className='align-bottom-right'>
        <button
          type='button'
          className='btn-primary action-btn '
          onClick={addToCartHandler}
        >
          Book now
        </button>
      </div>
    </>
  );
};

export default SingleRoomScreen;
