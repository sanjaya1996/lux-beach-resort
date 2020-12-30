import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import StripeCheckout from 'react-stripe-checkout';

import Loading from '../components/Loading';
import * as bookingActions from '../store/actions/bookings';
import Title from '../components/Title';
import AlertBox from '../components/AlertBox';
import { MAKE_PAYMENT_RESET } from '../store/reducers/bookings';

// Calculate Total Subtotal
let subTotal = 0;
let total = 0;

const calculateSubtotal = (chkin, chkout, rate) => {
  const timeDiff = Math.abs(new Date(chkout) - new Date(chkin));
  const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  subTotal = (daysDiff * rate).toFixed(2);
  total = subTotal;
  return subTotal;
};

const BookingDetailsScreen = ({ history, match }) => {
  const bookingId = match.params.id;

  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.currentUser);
  const { user, isAuthenticated } = currentUser;

  const bookingDetails = useSelector((state) => state.bookingDetails);
  const { loading, error, booking } = bookingDetails;

  const bookingPay = useSelector((state) => state.bookingPay);
  const { loading: loadingPay, error: errorPay, success } = bookingPay;

  useEffect(() => {
    if (isAuthenticated === false) {
      history.push('/login');
    } else if (isAuthenticated) {
      dispatch(bookingActions.getBookingDetails(bookingId));
    }
  }, [isAuthenticated, history, dispatch, bookingId, success]);

  const makePaymentHandler = (token) => {
    dispatch(bookingActions.payBooking(token, total, bookingId));
  };

  const alertCloseHandler = () => {
    dispatch({ type: MAKE_PAYMENT_RESET });
  };

  if (loading || loadingPay) {
    return <Loading />;
  }

  if (error) {
    return <AlertBox message={'Error! ' + error} noBtn />;
  }

  if (!booking) {
    return <Loading />;
  }

  return (
    <div className='bookingDetails-screen'>
      {errorPay && <AlertBox message={errorPay} onClose={alertCloseHandler} />}
      {success && (
        <AlertBox
          message='Successfully Paid! Your booking is completed.'
          type='success'
          onClose={alertCloseHandler}
        />
      )}
      <div className='bookingDetails-summaries'>
        <div className='summary-container'>
          <div className='one-half-responsive on-half-responsive-full-width'>
            <div className='one-half-responsive summary-heading'>
              Hotel Stay:
            </div>
            <div className='one-half-responsive'>
              <span className='summary-label'>Arrival Date:</span>{' '}
              {moment(new Date(booking.checkin_date)).format(
                'ddd, Do MMM YYYY'
              )}
            </div>
            <div className='one-half-responsive last'>
              <span className='summary-label'>Departure Date:</span>{' '}
              {moment(new Date(booking.checkout_date)).format(
                'ddd, Do MMM YYYY'
              )}
            </div>
            <div className='one-half-responsive'>Checkin: After 2:00 PM</div>
            <div className='one-half-responsive last'>
              Checkout: Before 10:00 AM
            </div>
            <div className='one-half-responsive summary-label'>
              Total Guests:
            </div>
            <div className='one-half-responsive last'>
              {booking.total_guests}
            </div>
            <div className='one-half-responsive summary-label'>Room type:</div>
            <div className='one-half-responsive last'>{booking.room_name}</div>
            <div className='one-half-responsive summary-label'>
              Standard rate:
            </div>
            <div className='one-half-responsive last'>
              ${Number(booking.room_price).toFixed(2)}/night
            </div>
            <div className='one-half-responsive summary-label'>
              Booking Subtotal:
            </div>
            <div className='one-half-responsive last'>
              $
              {calculateSubtotal(
                booking.checkin_date,
                booking.checkout_date,
                booking.room_price
              )}
            </div>

            <div className='one-half-responsive'></div>
            <div className='one-half-responsive border-line'></div>
            <div className='one-half-responsive summary-label'>
              Booking Total:
            </div>
            <div className='one-half-responsive last'>${total}</div>
            <div className='one-half-responsive summary-label'>
              Deposit Required:
            </div>
            <div className='one-half-responsive last'>0.00</div>
          </div>
        </div>

        <div className='summary-container'>
          <div className='one-half-responsive on-half-responsive-full-width'>
            <div className='one-half-responsive summary-heading'>
              Guest Details:
            </div>
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
            <div className='one-half-responsive summary-label'>
              Extra notes:
            </div>
            <div
              style={{ textTransform: 'none', lineHeight: '3' }}
              className='one-half-responsive last'
            >
              This is the fucking room. I want to fuck with my girl inside your
              room in a piece environment.
            </div>
          </div>
        </div>
      </div>
      <Title title='Payment Status' />
      {booking.is_paid ? (
        <AlertBox message={`Paid on ${booking.paid_at}`} type='success' noBtn />
      ) : (
        <>
          <AlertBox message='Not Paid!' noBtn />
          <div style={{ textAlign: 'center', paddingTop: '2em' }}>
            <StripeCheckout
              stripeKey='pk_test_BbuVbJumpNKWuxCFdOAUYoix00ZZvbAiJk'
              token={makePaymentHandler}
              name={'lux-beach-resort'}
              amount={total * 100}
              description={'room: ' + booking.room_name}
            >
              <button type='button' className='btn-primary action-btn'>
                {`Pay for $${total}`}
              </button>
            </StripeCheckout>
          </div>
        </>
      )}
    </div>
  );
};

export default BookingDetailsScreen;

/* <StripeCheckout
            stripeKey='pk_test_BbuVbJumpNKWuxCFdOAUYoix00ZZvbAiJk'
            token={makePayment}
            name={'lux-beach-resort'}
            amount={total * 100}
            description={'room: ' + selectedRoom.name}
          >
            <button type='button' className='btn-primary action-btn'>
              {`Pay for $${total}`}
            </button>
          </StripeCheckout> */
