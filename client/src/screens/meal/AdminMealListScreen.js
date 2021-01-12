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
      window.confirm('Are you Sure? Do you really want to delete this guest?')
    ) {
      dispatch(menuActions.deleteMeal(id));
    } else {
      return;
    }
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
    return <AlertBox message='Your bookings is empty!' type='success' noBtn />;
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
          message='Guest deleted successfully'
          type='message'
          onClose={alertCloseHandler}
        />
      )}

      <Title title='all Meals' />
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
                    <Link to='/'>
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
