import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Loading from '../../components/Loading';
import AlertBox from '../../components/AlertBox';
import Title from '../../components/Title';
import * as menuActions from '../../store/actions/menu';
import { MEAL_DELETE_RESET } from '../../store/reducers/menu';

const AdminMealListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.currentUser);
  const { error: errorUser, isAuthenticated, user } = currentUser;

  const mealList = useSelector((state) => state.mealList);
  const { loading, error, meals } = mealList;

  const mealDelete = useSelector((state) => state.mealDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = mealDelete;

  useEffect(() => {
    if (isAuthenticated === false || (user && !user.is_admin) || errorUser) {
      history.push('/login');
    } else if (user && user.is_admin) {
      dispatch(menuActions.listMeals());
    }
  }, [dispatch, user, isAuthenticated, history, errorUser, successDelete]);

  const deleteMealHandler = (id) => {
    if (
      window.confirm('Are you Sure? Do you really want to delete this Meal?')
    ) {
      dispatch(menuActions.deleteMeal(id));
    } else {
      return;
    }
  };

  const createMealHandler = () => {
    history.push('/admin/meal/edit');
  };

  const alertCloseHandler = () => {
    dispatch({ type: MEAL_DELETE_RESET });
  };

  if (loading || loadingDelete) {
    return <Loading />;
  }

  if (error) {
    return <AlertBox message={'Error! ' + error} noBtn />;
  }

  if (meals.length === 0) {
    return <AlertBox message=' No meals in your menu!' type='success' noBtn />;
  }

  return (
    <div className='screen'>
      {errorDelete && (
        <AlertBox
          message={'Error! ' + errorDelete}
          onClose={alertCloseHandler}
        />
      )}
      {successDelete && (
        <AlertBox
          message='Meal deleted successfully'
          type='message'
          onClose={alertCloseHandler}
        />
      )}

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 0,
        }}
      >
        <Title title='Meals' />
        <button
          onClick={createMealHandler}
          style={{ marginBottom: '2rem' }}
          className='btn-primary'
        >
          <i className='fas fa-plus'></i> Create Meal
        </button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table>
          <tbody>
            <tr>
              <th>ID</th>
              <th>MEAL</th>
              <th>CATEGORY</th>
              <th>PRICE</th>
              <th style={{ minWidth: '4em' }}></th>
            </tr>
            {meals.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div className='col-image'>
                      <img src={item.imageurl} alt={item.name} />
                    </div>
                    <span style={{ paddingLeft: '1em' }}> {item.name}</span>
                  </div>
                </td>
                <td>{item.category}</td>
                <td>${Number(item.price).toFixed(2)}</td>
                <td>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Link to={`/admin/meal/${item.id}/edit`}>
                      <i
                        style={{
                          cursor: 'pointer',
                          color: '#000000',
                        }}
                        className='fas fa-edit'
                      ></i>
                    </Link>

                    <i
                      onClick={() => deleteMealHandler(item.id)}
                      style={{ color: 'red', cursor: 'pointer' }}
                      className='fas fa-trash'
                    ></i>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminMealListScreen;
