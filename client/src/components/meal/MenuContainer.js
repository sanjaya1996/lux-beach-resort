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
  const { loading, error, meals } = mealList;

  useEffect(() => {
    dispatch(menuActions.listMeal());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <AlertBox message={error} />;
  }

  return (
    <>
      <MealsFilter />
      <MealList meals={meals} />
    </>
  );
};

export default MenuContainer;
