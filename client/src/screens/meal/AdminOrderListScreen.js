import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import Loading from '../../components/Loading';
import AlertBox from '../../components/AlertBox';
import Title from '../../components/Title';
import * as mealOrderActions from '../../store/actions/mealOrders';

const AdminOrderListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.currentUser);
  const { error: errorUser, isAuthenticated, user } = currentUser;

  const mealOrderList = useSelector((state) => state.mealOrderList);
  const { loading, error, orders } = mealOrderList;

  useEffect(() => {
    if (isAuthenticated === false || (user && !user.is_admin) || errorUser) {
      history.push('/login');
    } else if (user && user.is_admin) {
      dispatch(mealOrderActions.listMealOrders());
    }
  }, [dispatch, user, isAuthenticated, history, errorUser]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <AlertBox message={'Error! ' + error} noBtn />;
  }

  if (orders.length === 0) {
    return <AlertBox message='Your bookings is empty!' type='success' noBtn />;
  }

  return (
    <div className='screen'>
      <Title title='all orders' />
      <div style={{ overflowX: 'auto' }}>
        <table>
          <tbody>
            <tr>
              <th>ID</th>
              <th>GUEST</th>
              <th>ORDERED</th>
              <th>PICKUP</th>
              <th>TOTAL AMOUNT</th>
              <th>PAID</th>
              <th>PICKED UP</th>
              <th></th>
            </tr>
            {orders.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.guest_name}</td>
                <td>
                  <span
                    style={{
                      textTransform: 'lowercase',
                      fontWeight: 'lighter',
                      fontStyle: 'italic',
                      fontSize: '0.8em',
                    }}
                  >
                    {moment(item.ordered_at).fromNow()}
                  </span>
                </td>
                <td>
                  {moment(item.pickup_time).format('ddd, YYYY-MM-DD, h:mm A')}
                </td>
                <td>${Number(item.total_amount).toFixed(2)}</td>
                <td>
                  {item.is_paid ? (
                    <i
                      style={{ color: '#4BB543' }}
                      className='fas fa-check'
                    ></i>
                  ) : (
                    <span style={{ color: 'red', fontWeight: 'bold' }}>x</span>
                  )}
                </td>
                <td>
                  {item.is_pickedup ? (
                    <i
                      style={{ color: '#4BB543' }}
                      className='fas fa-check'
                    ></i>
                  ) : (
                    <span style={{ color: 'red', fontWeight: 'bold' }}>x</span>
                  )}
                </td>
                <td>
                  <Link to={`/mealorders/${item.id}`}>
                    <button className='btn-primary'>Details</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrderListScreen;
