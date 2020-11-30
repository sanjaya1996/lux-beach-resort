import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import Banner from '../components/Banner';
import Hero from '../components/Hero';
import RoomsContainer from '../components/RoomsContainer';
import Loading from '../components/Loading';
import * as roomsActions from '../store/actions/rooms';

const RoomsScreen = () => {
  return (
    <>
      <Hero hero='roomsHero' heroImage='/images/room-2.jpeg'>
        <Banner title='our rooms'>
          <Link to='/'>
            <button className='btn-primary'>return home</button>
          </Link>
        </Banner>
      </Hero>
      <RoomsContainer />
    </>
  );
};

export default RoomsScreen;
