import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import Title from '../../components/Title';
import Loading from '../../components/Loading';
import AlertBox from '../../components/AlertBox';
import * as mealOrderActions from '../../store/actions/mealOrders';
import { ORDER_PICKED_UP_RESET } from '../../store/reducers/mealOrders';

const OrderDetailsScreen = ({ history, match }) => {
  const orderId = match.params.id;

  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.currentUser);
  const { user, isAuthenticated } = currentUser;

  const mealOrderDetails = useSelector((state) => state.mealOrderDetails);
  const { loading, error, order } = mealOrderDetails;

  const orderPickedUp = useSelector((state) => state.orderPickedUp);
  const {
    loading: loadingPickedUp,
    error: errorPickedUp,
    success: successPickedUp,
  } = orderPickedUp;

  useEffect(() => {
    if (isAuthenticated === false) {
      history.push('/login');
    } else if (isAuthenticated) {
      dispatch(mealOrderActions.getMealOrderDetails(orderId));
    }
  }, [isAuthenticated, history, dispatch, orderId, successPickedUp]);

  const markAsPickedUpHandler = () => {
    dispatch(mealOrderActions.markOrderasPickedUp(orderId));
  };

  const closeAlertHandler = () => {
    dispatch({ type: ORDER_PICKED_UP_RESET });
  };

  if (loading || loadingPickedUp) {
    return <Loading />;
  }

  if (error) {
    return <AlertBox message={'Error! ' + error} noBtn />;
  }

  if (!order) {
    return <Loading />;
  }

  return (
    <div className='screen'>
      {errorPickedUp && (
        <AlertBox
          message={'Error! ' + errorPickedUp}
          onClose={closeAlertHandler}
        />
      )}
      {successPickedUp && (
        <AlertBox
          message='Order has been successfully marked as picked up!'
          type='success'
          onClose={closeAlertHandler}
        />
      )}
      <div className='bookingDetails-summaries'>
        <div className='summary-container placeorder-section '>
          <div style={{ display: 'flex' }}>
            <Title title='Order items' />
          </div>
          <ul className='orderitems'>
            {order.meals.map((meal) => (
              <li key={meal.meal_id} className='placeorder-itemlist'>
                <div className='item-column'>
                  <img src={meal.imageurl} alt='ItemImage' />
                </div>
                <div className='item-column'>{meal.meal_name}</div>
                <div className='item-column'>
                  {meal.quantity} * ${meal.price} = $
                  {Number(meal.quantity * meal.price).toFixed(2)}
                </div>
              </li>
            ))}
          </ul>

          <div style={{ paddingTop: '4em' }}>
            <div style={{ display: 'flex' }}>
              <Title title='Pickup' />
            </div>

            <div className='one-half-responsive on-half-responsive-full-width'>
              <div className='one-half-responsive summary-label'>
                Item Subtotal:
              </div>
              <div className='one-half-responsive last'>$0.00</div>

              <div className='one-half-responsive summary-label'>
                Service Fee:
              </div>
              <div className='one-half-responsive last'>$0.00</div>

              <div className='one-half-responsive summary-label'>Tax:</div>
              <div className='one-half-responsive last'>$0.00</div>
              <div className='one-half-responsive summary-label'>Total:</div>
              <div className='one-half-responsive last'>
                ${order.total_amount}
              </div>
            </div>
            {/* <p style={{ color: 'white' }}>White space</p> */}

            <div className='one-half-responsive on-half-responsive-full-width'>
              {order.is_paid ? (
                <AlertBox
                  message={`Paid on ${order.ordered_at}.`}
                  type='success'
                  noBtn
                />
              ) : (
                <AlertBox message='Not Paid' noBtn />
              )}

              {order.is_pickedup ? (
                <AlertBox
                  message={`Order Picked up ${moment(
                    order.picked_up_time
                  ).fromNow()}.`}
                  type='success'
                  noBtn
                />
              ) : user.is_admin ? (
                <div
                  style={{
                    textAlign: 'center',
                    margin: 'auto',
                    paddingBottom: '1em',
                  }}
                >
                  <button
                    onClick={markAsPickedUpHandler}
                    className='btn-primary'
                  >
                    Mark as picked up
                  </button>
                </div>
              ) : (
                <AlertBox message='Not Picked Up' noBtn />
              )}
            </div>
            <div className='one-half-responsive on-half-responsive-full-width'>
              <div className='one-half-responsive summary-label'>Ordered:</div>
              <div className='one-half-responsive last'>
                {moment(order.ordered_at).fromNow()}
              </div>

              <div className='one-half-responsive summary-label'>
                Pickup Note:
              </div>
              <div
                style={{ textTransform: 'none', lineHeight: '3' }}
                className='one-half-responsive last'
              >
                {order.pickup_note}
              </div>
            </div>
          </div>
        </div>

        <div className='summary-container'>
          <div style={{ display: 'flex' }}>
            <Title title='Customer' />
          </div>
          <div className='one-half-responsive on-half-responsive-full-width'>
            <div className='one-half-responsive'>
              <span className='summary-label'>FirstName:</span>{' '}
              {user.name.split(' ')[0]}
            </div>
            <div className='one-half-responsive last'>
              <span className='summary-label'>Last Name:</span>{' '}
              {user.name.split(' ')[1]}
            </div>
            <div className='one-half-responsive summary-label'>
              Phone number:
            </div>
            <div className='one-half-responsive last'>{user.phone}</div>
            <div className='one-half-responsive summary-label'>Email:</div>
            <div
              style={{ textTransform: 'none' }}
              className='one-half-responsive last'
            >
              {user.email}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsScreen;
