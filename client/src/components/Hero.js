import React from 'react';

const imageStyle = {
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
};

const Hero = ({ children, hero, heroImage }) => {
  return (
    <header
      className={hero}
      style={{ ...imageStyle, backgroundImage: 'url(' + heroImage + ')' }}
    >
      {children}
    </header>
  );
};

Hero.defaultProps = {
  hero: 'defaultHero',
  heroImage: '/images/defaultBcg.jpeg',
};

export default Hero;
