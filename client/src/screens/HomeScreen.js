import React from 'react';
import { Link } from 'react-router-dom';

import Hero from '../components/Hero';
import Banner from '../components/Banner';
import Services from '../components/Services';
import FeaturedRooms from '../components/FeaturedRooms';
import AlertBox from '../components/AlertBox';

const HomeScreen = () => {
  return (
    <>
      <Hero>
        <Banner
          title='luxurious rooms'
          subtitle='deluxe rooms starting at $299'
        >
          <Link to='/rooms' className='btn-primary'>
            Our rooms
          </Link>
        </Banner>
      </Hero>
      <Services />
      <AlertBox
        type='primary'
        message='Error While loading rooms Error While loading rooms Error While loading rooms Error While loading rooms'
      />
      <FeaturedRooms />
    </>
  );
};

export default HomeScreen;
