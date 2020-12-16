import React, { useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

import ErrorScreen from './ErrorScreen';
import Loading from '../components/Loading';
import Title from '../components/Title';
import * as roomActions from '../store/actions/rooms';
import * as bookingActions from '../store/actions/bookings';

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

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state,
      [action.name]: action.value,
    };
    return updatedValues;
  } else {
    return state;
  }
};

// MAIN SCREEN COMPONENT
const PaymentScreen = ({ match, history }) => {
  const { id, guests, chkin, chkout } = match.params;

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    email: '',
    fName: '',
    lName: '',
    title: '',
    mobileNumber: '',
    note: '',
  });

  const checkRoomAvailability = useSelector(
    (state) => state.checkRoomAvailability
  );

  const roomBooking = useSelector((state) => state.roomBooking);
  const { loading: reserveLoading, success, error: reserveError } = roomBooking;

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

  useEffect(() => {
    if (success) {
      const title = 'Email has been Sent!';
      const message = 'Please check your email, and confirm your booking.';
      history.push(`/success/${title}/${message}`);
    }
  }, [success, history]);

  const makePayment = async (token) => {
    try {
      const body = { token, room: selectedRoom, amount: total };
      const config = { 'Content-Type': 'application/json' };

      const { data } = await axios.post(
        'http://localhost:5000/api/payment',
        body,
        config
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const reserveNowHandler = () => {
    const bookingDetails = {
      name: formState.fName + ' ' + formState.lName,
      email: formState.email,
      phone: formState.mobileNumber,
      roomId: selectedRoom.id,
      checkInDate: selectedCheckIn,
      checkOutDate: selectedCheckOut,
    };
    dispatch(bookingActions.bookRoom(bookingDetails));
  };

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    dispatchFormState({ type: FORM_INPUT_UPDATE, name, value });
  };

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
      {reserveError && <p>{reserveError}</p>}
      <p>
        Please <span className='underlined-link'>Sign In</span> /{' '}
        <span className='underlined-link'>Create an account</span> for easy &
        secure bookings.
      </p>
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
          <input
            type='email'
            name='email'
            value={formState.email}
            onChange={inputChangeHandler}
            className='form-control'
          />
        </div>

        <div className='form-group one-half-responsive'>
          <label htmlFor='fName' className='summary-label'>
            First Name:
          </label>
          <input
            type='text'
            name='fName'
            value={formState.fName}
            onChange={inputChangeHandler}
            className='form-control'
          />
        </div>

        <div className='form-group form-group one-half-responsive'>
          <label htmlFor='lName' className='summary-label'>
            Last Name:
          </label>
          <input
            type='text'
            name='lName'
            value={formState.lName}
            onChange={inputChangeHandler}
            className='form-control'
          />
        </div>

        <div className='form-group form-group one-half-responsive'>
          <label htmlFor='title' className='summary-label'>
            Title:
          </label>
          <select
            id='title'
            name='title'
            value={formState.title}
            onChange={inputChangeHandler}
            className='form-control'
          >
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
          <label htmlFor='mobileNumber' className='summary-label'>
            Mobile Number:
          </label>
          <input
            type='text'
            name='mobileNumber'
            value={formState.mobileNumber}
            onChange={inputChangeHandler}
            className='form-control'
          />
        </div>
        <div className='form-group form-group one-half-responsive note-input'>
          <label htmlFor='note'>Note:</label>
          <input
            type='text'
            name='note'
            value={formState.note}
            onChange={inputChangeHandler}
            className='form-control'
          />
        </div>
      </form>
      <div style={{ alignSelf: 'flex-start', marginTop: '2rem' }}>
        <h3>Booking ?</h3>
      </div>
      <div style={{ display: 'inline-block' }}>
        <StripeCheckout
          stripeKey='pk_test_BbuVbJumpNKWuxCFdOAUYoix00ZZvbAiJk'
          token={makePayment}
          name={'lux-beach-resort'}
          amount={total * 100}
          description={'room: ' + selectedRoom.name}
        >
          <button className='btn-primary action-btn'>
            {`Pay for $${total}`}
          </button>
        </StripeCheckout>
      </div>
      <div style={{ alignSelf: 'flex-start', marginTop: '2rem' }}>
        <h3>Reservation ?</h3>
        <p style={{ paddingBottom: 10 }}>
          For our new guests, we will send an email to confirm your reservation.
        </p>
        <button onClick={reserveNowHandler} className='btn-primary action-btn'>
          {reserveLoading ? 'loading...' : 'Reserve now'}
        </button>
      </div>
    </div>
  );
};

export default PaymentScreen;
