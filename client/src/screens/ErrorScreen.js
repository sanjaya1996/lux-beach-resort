import React from 'react';
import { Link } from 'react-router-dom';
import Banner from '../components/Banner';
import Hero from '../components/Hero';

const ErrorScreen = () => {
  return (
    <Hero>
      <Banner title='404' subtitle='page not found'>
        <Link to='/' className='btn-primary'>
          return home
        </Link>
      </Banner>
    </Hero>
  );
};

export default ErrorScreen;
