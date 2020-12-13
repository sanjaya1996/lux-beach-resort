import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import * as roomActions from '../store/actions/rooms';
import ErrorScreen from './ErrorScreen';
import Loading from '../components/Loading';
import Title from '../components/Title';

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

const PaymentScreen = ({ match }) => {
  const { id, guests, chkin, chkout } = match.params;

  const dispatch = useDispatch();

  const checkRoomAvailability = useSelector(
    (state) => state.checkRoomAvailability
  );
  const {
    loading,
    bookingAvailable,
    error,
    selectedRoom,
    selectedCheckIn,
    selectedCheckOut,
    selectedGuests,
  } = checkRoomAvailability;

  useEffect(() => {
    dispatch(roomActions.checkAvailability(id, chkin, chkout, guests));
  }, [dispatch, id, chkin, chkout, guests]);

  if (loading) {
    return (
      <div className='centered'>
        <Loading />
      </div>
    );
  }

  if (bookingAvailable === false || error) {
    return (
      <ErrorScreen
        title='Error Occurred!'
        subtitle='Something wrong with your bookings parameters'
      />
    );
  }

  if (!selectedRoom) {
    return (
      <div className='centered'>
        <h1>Room Not found</h1>
      </div>
    );
  }

  return (
    <div className='payment-screen'>
      <div className='summary-container'>
        <div className='one-half-responsive summary-heading'>Your Stay:</div>
        <div className='one-half-responsive'>
          <div className='one-half-responsive'>
            <span className='summary-label'>Arrival Date:</span>{' '}
            {moment(new Date(selectedCheckIn)).format('ddd, Do MMM YYYY')}
          </div>
          <div className='one-half-responsive last'>
            <span className='summary-label'>Departure Date:</span>{' '}
            {moment(new Date(selectedCheckOut)).format('ddd, Do MMM YYYY')}
          </div>
          <div className='one-half-responsive'>Checkin: After 2:00 PM</div>
          <div className='one-half-responsive last'>
            Checkout: Before 10:00 AM
          </div>
          <div className='one-half-responsive summary-label'>Total Guests:</div>
          <div className='one-half-responsive last'>{selectedGuests}</div>
          <div className='one-half-responsive summary-label'>Room type:</div>
          <div className='one-half-responsive last'>{selectedRoom.name}</div>
          <div className='one-half-responsive summary-label'>
            Standard rate:
          </div>
          <div className='one-half-responsive last'>
            ${Number(selectedRoom.price).toFixed(2)}/night
          </div>
          <div className='one-half-responsive summary-label'>
            Booking Subtotal:
          </div>
          <div className='one-half-responsive last'>
            $
            {calculateSubtotal(
              selectedCheckIn,
              selectedCheckOut,
              selectedRoom.price
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
      <div style={{ alignSelf: 'flex-start' }}>
        <Title title='Guest Details' />
      </div>
      <form className='guest-form one-half-responsive'>
        <div className='form-group one-half-responsive'>
          <label htmlFor='Email' className='summary-label'>
            Email:
          </label>
          <input type='email' className='form-control' />
        </div>

        <div className='form-group one-half-responsive'>
          <label htmlFor='Email' className='summary-label'>
            First Name:
          </label>
          <input type='email' className='form-control' />
        </div>

        <div className='form-group form-group one-half-responsive'>
          <label htmlFor='Email' className='summary-label'>
            Last Name:
          </label>
          <input type='email' className='form-control' />
        </div>

        <div className='form-group form-group one-half-responsive'>
          <label htmlFor='Email' className='summary-label'>
            Title:
          </label>
          <select name='title' id='title' value='' className='form-control'>
            {['Dr', 'Miss', 'Mr', 'Mr & Mrs', 'Mrs', 'Ms'].map(
              (item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              )
            )}
          </select>
        </div>

        <div className='form-group form-group one-half-responsive'>
          <label htmlFor='Email' className='summary-label'>
            Mobile Number:
          </label>
          <input type='email' className='form-control' />
        </div>
        <div className='form-group form-group one-half-responsive note-input'>
          <label htmlFor='Email'>Note:</label>
          <input type='email' className='form-control' />
        </div>
      </form>
      <div style={{ alignSelf: 'flex-start' }}>
        <Title title='Payment Details' />
      </div>
    </div>
  );
};

export default PaymentScreen;
