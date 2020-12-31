import React from 'react';

import MealList from './MealList';
import MEALS from '../../data';

const MenuContainer = () => {
  return (
    <>
      <MealList meals={MEALS} />
    </>
  );
};

export default MenuContainer;
