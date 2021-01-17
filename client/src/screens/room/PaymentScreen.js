import React, {
  useCallback,
  useEffect,
  useReducer,
  useMemo,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import StripeCheckout from 'react-stripe-checkout';

import ErrorScreen from '../ErrorScreen';
import Loading from '../../components/Loading';
import Title from '../../components/Title';
import Input from '../../components/Input';
import AlertBox from '../../components/AlertBox';
import * as roomActions from '../../store/actions/rooms';
import * as bookingActions from '../../store/actions/bookings';
import { CHECK_AVAILABILITY_RESET } from '../../store/reducers/rooms';
import { ROOM_BOOKING_RESET } from '../../store/reducers/bookings';
import { Link } from 'react-router-dom';

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
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  } else {
    return state;
  }
};

// MAIN SCREEN COMPONENT
const PaymentScreen = ({ match, history }) => {
  const { id, guests, chkin, chkout } = match.params;

  const [showError, setShowError] = useState(false);

  const currentUser = useSelector((state) => state.currentUser);
  const { user } = currentUser;

  const getUser = useMemo(() => {
    return user;
  }, [user]);

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      fName: '',
      lName: '',
      title: 'Mr',
      mobileNumber: '',
      note: '',
    },
    inputValidities: {
      email: false,
      fName: false,
      lName: true,
      title: true,
      mobileNumber: false,
      note: false,
    },
    formIsValid: false,
  });

  // const currentUser = useSelector( state => state.currentUser);
  // const {user} = currentUser;

  const checkRoomAvailability = useSelector(
    (state) => state.checkRoomAvailability
  );

  const roomBooking = useSelector((state) => state.roomBooking);
  const {
    loading: bookingLoading,
    success,
    error: reserveError,
    successMessage,
  } = roomBooking;

  const {
    loading,
    bookingAvailable,
    error,
    selectedRoom,
    selectedCheckIn,
    selectedCheckOut,
    selectedGuests,
  } = checkRoomAvailability;

  // Validate url parameters and validate in backend
  useEffect(() => {
    if (success) {
      const title = successMessage.title;
      const message = successMessage.message;
      history.push(`/success/${title}/${message}`);
      dispatch({ type: ROOM_BOOKING_RESET });
      dispatch({ type: CHECK_AVAILABILITY_RESET });
    } else {
      dispatch(roomActions.checkAvailability(id, chkin, chkout, guests));
    }
  }, [dispatch, success, successMessage, history, id, chkin, chkout, guests]);

  useEffect(() => {
    if (user) {
      const type = FORM_INPUT_UPDATE;
      const isValid = true;
      const { email, name, title, phone } = user;
      const fName = name.split(' ')[0];
      const lName = name.split(' ')[1];

      dispatchFormState({ type, input: 'email', value: email, isValid });
      dispatchFormState({ type, input: 'fName', value: fName, isValid });
      dispatchFormState({ type, input: 'lName', value: lName, isValid });
      dispatchFormState({ type, input: 'title', value: title, isValid });
      dispatchFormState({ type, input: 'mobileNumber', value: phone, isValid });
    }
  }, [user]);

  const makePayment = async (token) => {
    const name =
      formState.inputValues.fName + ' ' + formState.inputValues.lName;
    const email = formState.inputValues.email;
    const phone = formState.inputValues.mobileNumber;
    const title = formState.inputValues.title;
    const roomId = selectedRoom.id;
    const checkInDate = selectedCheckIn;
    const checkOutDate = selectedCheckOut;

    dispatch(
      bookingActions.payAndBookRoom(
        token,
        total,
        name,
        email,
        phone,
        title,
        roomId,
        checkInDate,
        checkOutDate
      )
    );
  };

  // Book room after payment

  const reserveNowHandler = () => {
    if (!formState.formIsValid) {
      alert('Your Details are not valid!');
      return;
    }

    const bookingDetails = {
      name: formState.inputValues.fName + ' ' + formState.inputValues.lName,
      email: formState.inputValues.email,
      phone: formState.inputValues.mobileNumber,
      roomId: selectedRoom.id,
      checkInDate: selectedCheckIn,
      checkOutDate: selectedCheckOut,
      amount: total,
    };

    dispatch(bookingActions.bookRoom(bookingDetails, 'email'));
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        input: inputIdentifier,
        isValid: inputValidity,
        value: inputValue,
      });
    },
    [dispatchFormState]
  );

  if (loading || bookingLoading) {
    return (
      <div className='centered'>
        <Loading />
      </div>
    );
  }

  if (bookingAvailable === false || error) {
    return <ErrorScreen title='Error Occurred!' subtitle={error} />;
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
      {reserveError && <AlertBox message={reserveError} />}
      <p>
        Please{' '}
        <span className='underlined-link'>
          <Link to='/login'>Sign In</Link>
        </span>{' '}
        /{' '}
        <span className='underlined-link'>
          <Link to='/login'>Create an account</Link>
        </span>{' '}
        for easy & secure bookings.
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
      <form className='guest-form form-one-half-responsive'>
        <div className='form-group item-a'>
          <Input
            label='Email: '
            type='email'
            name='email'
            errorText='Email not valid!'
            disabled={user && user.auth_provider_name === 'google'}
            onInputChange={inputChangeHandler}
            initialValue={user ? user.email : ''}
            initiallyValid={user ? true : false}
            required
            email
            showError={showError}
            getUser={getUser}
          />
        </div>

        <div className='form-group item-b'>
          <Input
            label='First Name: '
            type='text'
            name='fName'
            errorText='name not valid!'
            disabled={user ? true : false}
            onInputChange={inputChangeHandler}
            initialValue={user ? user.name.split(' ')[0] : ''}
            initiallyValid={user ? true : false}
            required
            showError={showError}
            getUser={getUser}
          />
        </div>

        <div className='form-group item-c'>
          <Input
            label='Last Name: '
            type='text'
            name='lName'
            disabled={user ? true : false}
            onInputChange={inputChangeHandler}
            initialValue={user ? user.name.split(' ')[1] : ''}
            initiallyValid={true}
            getUser={getUser}
          />
        </div>

        <div className='form-group item-d'>
          <Input
            label='Title: '
            type='select'
            name='title'
            options={['Mr', 'Dr', 'Miss', 'Mr & Mrs', 'Mrs', 'Ms']}
            onInputChange={inputChangeHandler}
            initialValue={user ? user.title : 'Mr'}
            initiallyValid={true}
            required
            getUser={getUser}
          />
        </div>

        <div className='form-group item-e'>
          <Input
            label='Mobile No.: '
            type='text'
            name='mobileNumber'
            errorText='mobile not valid!'
            onInputChange={inputChangeHandler}
            initialValue={user ? user.phone : ''}
            initiallyValid={user ? true : false}
            required
            minLength={10}
            showError={showError}
            getUser={getUser}
          />
        </div>
        <div className='form-group item-f note-input'>
          <Input
            label='Booking Note: '
            placeholder='Leave a note for your booking...'
            type='text'
            name='note'
            value={formState.inputValues.note}
            onInputChange={inputChangeHandler}
            initiallyValid={true}
          />
        </div>
      </form>
      <div style={{ alignSelf: 'flex-start', marginTop: '2rem' }}>
        <h3>Booking ?</h3>
      </div>
      <div style={{ display: 'inline-block' }}>
        {formState.formIsValid ? (
          <StripeCheckout
            stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
            token={makePayment}
            name={'lux-beach-resort'}
            amount={total * 100}
            description={'room: ' + selectedRoom.name}
          >
            <button type='button' className='btn-primary action-btn'>
              {`Pay for $${total}`}
            </button>
          </StripeCheckout>
        ) : (
          <div style={{ display: 'inline-block', cursor: 'not-allowed' }}>
            <button
              type='button'
              disabled={!formState.formIsValid}
              onClick={() => {
                alert('Your Details are not valid!');
                setShowError(true);
              }}
              className={`btn-primary action-btn ${
                !formState.formIsValid && 'btn-disable'
              }`}
            >
              {`Pay for $${total}`}
            </button>
          </div>
        )}
      </div>
      <div style={{ alignSelf: 'flex-start', marginTop: '2rem' }}>
        <h3>Reservation ?</h3>
        <p style={{ paddingBottom: 10 }}>
          For our new guests, we will send an email to confirm your reservation.
        </p>
        <div
          style={{
            display: 'inline-block',
            cursor: !formState.formIsValid && 'not-allowed',
          }}
        >
          <button
            onClick={reserveNowHandler}
            className={`btn-primary action-btn ${
              !formState.formIsValid && 'btn-disable'
            }`}
          >
            Reserve now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentScreen;
