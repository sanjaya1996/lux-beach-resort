import React from 'react';
import { Link } from 'react-router-dom';

import Banner from '../../components/Banner';
import Hero from '../../components/Hero';
import MenuContainer from '../../components/meal/MenuContainer';

const MenuScreen = () => {
  return (
    <>
      <Hero hero='menuHero'>
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
