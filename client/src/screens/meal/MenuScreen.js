import React from 'react';
import { Link } from 'react-router-dom';

import Banner from '../../components/Banner';
import Hero from '../../components/Hero';
import MenuContainer from '../../components/meal/MenuContainer';

const MenuScreen = () => {
  return (
    <>
      <Hero
        hero='roomsHero'
        // heroImage='https://cdn.pixabay.com/photo/2014/10/23/18/05/burger-500054_1280.jpg'
        heroImage='https://cdn.pixabay.com/photo/2018/07/11/21/51/toast-3532016_1280.jpg'
      >
        <Banner title='our menu'>
          <Link to='/'>
            <button className='btn-primary'>return home</button>
          </Link>
        </Banner>
      </Hero>
      <MenuContainer />
    </>
  );
};

export default MenuScreen;
