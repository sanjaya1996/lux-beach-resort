import React from 'react';

import MealList from './MealList';
import MealsFilter from './MealsFilter';
import MEALS from '../../data';

const MenuContainer = () => {
  return (
    <>
      <MealsFilter />
      <MealList meals={MEALS} />
    </>
  );
};

export default MenuContainer;
