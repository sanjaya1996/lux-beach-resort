import React from 'react';
import { useHistory } from 'react-router-dom';

import Banner from '../components/Banner';
import Hero from '../components/Hero';

const ErrorScreen = ({ children, title, subtitle }) => {
  const history = useHistory();
  return (
    <Hero>
      <Banner title={title || '404'} subtitle={subtitle || 'page not found'}>
        <button
          type='button'
          onClick={() => (children ? history.goBack() : history.push('/'))}
          className='btn-primary'
        >
          {children || 'return home'}
        </button>
      </Banner>
    </Hero>
  );
};

export default ErrorScreen;
