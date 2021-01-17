import React from 'react';
import { FaCocktail, FaHiking, FaShuttleVan, FaBeer } from 'react-icons/fa';

import Title from './Title';

const services = [
  {
    icon: <FaCocktail />,
    title: 'Free Cocktails',
    info:
      'Irish coffee cocktail. “It’s a cold version of an Irish coffee—an Australian version!” co-owner Stefano Catino says. Ingredients include Redbreast 12 Irish whisky, house-made cold brew, and cream to finish.',
  },
  {
    icon: <FaHiking />,
    title: 'Endless Hiking',
    info:
      'You’ve conquered Sydney’s iconic bushwalks, now it’s time to challenge yourself with a longer track! Lucky for you Sydney and its surrounding areas have plenty of beautiful terrain.',
  },
  {
    icon: <FaShuttleVan />,
    title: 'Free Shuttle',
    info:
      'The Parramatta shuttle bus (formerly the Loop) is a fast, free transport solution run by Transport for NSW through Transdev that connects tourists, residents and commuters to the commercial, retail and recreational landmarks of the city.',
  },
  {
    icon: <FaBeer />,
    title: 'Strongest Beer',
    info:
      'The strongest beer in the world is the Brewmeister Snake Venom. Bottled at 67.5% ABV, the Scottish beer is easily the heaviest on offer.',
  },
];

const Services = () => {
  return (
    <section className='services'>
      <Title title='services' />
      <div className='services-center'>
        {services.map((item, idx) => (
          <article key={idx} className='service'>
            <span>{item.icon}</span>
            <h6>{item.title}</h6>
            <p>{item.info}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Services;
