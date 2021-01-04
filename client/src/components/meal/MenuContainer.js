import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MealList from './MealList';
import MealsFilter from './MealsFilter';
import Loading from '../Loading';
import AlertBox from '../AlertBox';
import * as menuActions from '../../store/actions/menu';

const MenuContainer = () => {
  const dispatch = useDispatch();

  const mealList = useSelector((state) => state.mealList);
  const { loading, error, meals, filteredMeals } = mealList;

  useEffect(() => {
    dispatch(menuActions.listMeal());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <AlertBox message={'Error! ' + error} noBtn />;
  }

  return (
    <>
      <MealsFilter meals={meals} />
      <MealList meals={filteredMeals} />
    </>
  );
};

export default MenuContainer;
