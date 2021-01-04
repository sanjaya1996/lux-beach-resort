import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loading from '../../components/Loading';
import AlertBox from '../../components/AlertBox';
import * as mealActions from '../../store/actions/menu';

const OrderPaymentScreen = ({ match, location }) => {
  const mealId = Number(match.params.id);
  const qty = location.search ? location.search.split('=')[1] : 1;

  const dispatch = useDispatch();

  const mealDetails = useSelector((state) => state.mealDetails);
  const { loading, error, meal } = mealDetails;

  useEffect(() => {
    dispatch(mealActions.listMealDetails(mealId));
  }, [dispatch, mealId]);

  if (!meal || meal.id !== mealId) {
    return <Loading />;
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <AlertBox message={error} noBtn />
      ) : (
        <h3>{meal.name}</h3>
      )}
    </>
  );
};

export default OrderPaymentScreen;
