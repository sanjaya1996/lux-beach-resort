import React from 'react';
import { useHistory } from 'react-router-dom';

import Banner from './Banner';
import Hero from './Hero';

const BannerMessage = ({ children, title, subtitle }) => {
  const history = useHistory();
  return (
    <Hero>
      <Banner title={title} subtitle={subtitle}>
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

export default BannerMessage;
