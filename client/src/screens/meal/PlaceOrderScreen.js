import React, { useReducer, useCallback } from 'react';
import { useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import StripeCheckout from 'react-stripe-checkout';

import AlertBox from '../../components/AlertBox';
import Title from '../../components/Title';
import Input from '../../components/Input';

const currentDate = new Date();
const inititalPickupTime = currentDate.setTime(
  currentDate.getTime() + 0.5 * 60 * 60 * 1000
);

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

const PlaceOrderScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { meals } = cart;

  // Calculate Prices
  cart.mealsPrice = cart.meals
    .reduce((acc, meal) => acc + meal.price * meal.qty, 0)
    .toFixed(2);
  cart.serviceFee = (0).toFixed(2);
  cart.taxPrice = (0).toFixed(2);
  cart.totalPrice = (
    Number(cart.mealsPrice) +
    Number(cart.serviceFee) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      fName: '',
      lName: '',
      title: 'Mr',
      mobileNumber: '',
      pickupTime: inititalPickupTime,
    },
    inputValidities: {
      email: false,
      fName: false,
      lName: true,
      title: true,
      mobileNumber: false,
      pickupTime: true,
    },
    formIsValid: false,
  });

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

  const dateChangeHandler = (inputIdentifier, inputValue) => {
    let inputValidity = true;
    const inputDate = new Date(inputValue);

    if (inputDate < new Date()) {
      inputValidity = false;
    }

    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      input: inputIdentifier,
      isValid: inputValidity,
      value: inputValue,
    });
  };

  if (meals.length === 0) {
    return <AlertBox message='Your Cart is Empty !' type='message' noBtn />;
  }

  return (
    <div className='screen'>
      <section className='placeorder-section'>
        <div style={{ display: 'flex' }}>
          <Title title='Order items' />
        </div>
        <ul className='orderitems'>
          {meals.map((meal) => (
            <li key={meal.id} className='placeorder-itemlist'>
              <div className='item-column'>
                <img src={meal.imageurl} alt='ItemImage' />
              </div>
              <div className='item-column'>{meal.name}</div>
              <div className='item-column'>
                {meal.qty} * ${meal.price} = $
                {Number(meal.qty * meal.price).toFixed(2)}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className='placeorder-section'>
        <div style={{ display: 'flex' }}>
          <Title title='Pickup order' />
        </div>
        <div className='form-group'>
          <label htmlFor='date'>Pickup Time :</label>{' '}
          {!formState.inputValidities.pickupTime && (
            <p
              style={{
                padding: 0,
                fontWeight: 'normal',
                fontStyle: 'italic',
                fontSize: '0.6rem',
                color: 'red',
              }}
            >
              There was an error in your date
            </p>
          )}
          <DatePicker
            selected={formState.inputValues.pickupTime}
            showTimeSelect
            minDate={new Date()}
            dateFormat='MMMM d, yyyy h:mm aa'
            onChange={(date) => dateChangeHandler('pickupTime', date)}
            className='form-control'
          />
        </div>
        <div style={{ maxWidth: '800px' }} className='form-group'>
          <label htmlFor='date'>Pickup Note :</label>{' '}
          <textarea
            rows='2'
            cols='50'
            maxLength='200'
            className='form-control'
          />
        </div>
      </section>

      <section className='placeorder-section'>
        <div style={{ display: 'flex' }}>
          <Title title='Customer Details' />
        </div>

        <form className='guest-form form-one-half-responsive'>
          <div className='form-group item-a'>
            <Input
              label='Email: '
              type='email'
              name='email'
              errorText='Email not valid!'
              value={formState.inputValues.email}
              onInputChange={inputChangeHandler}
              initiallyValid={false}
              required
              email
            />
          </div>

          <div className='form-group item-b'>
            <Input
              label='First Name: '
              type='text'
              name='fName'
              errorText='name not valid!'
              value={formState.inputValues.fName}
              onInputChange={inputChangeHandler}
              initiallyValid={false}
              required
            />
          </div>

          <div className='form-group item-c'>
            <Input
              label='Last Name: '
              type='text'
              name='lName'
              value={formState.inputValues.lName}
              onInputChange={inputChangeHandler}
              initiallyValid={true}
            />
          </div>

          <div className='form-group item-d'>
            <Input
              label='Title: '
              type='select'
              name='title'
              value={formState.inputValues.title}
              options={['Mr', 'Dr', 'Miss', 'Mr & Mrs', 'Mrs', 'Ms']}
              onInputChange={inputChangeHandler}
              initiallyValid={true}
              required
            />
          </div>

          <div className='form-group item-e'>
            <Input
              label='Mobile No.: '
              type='text'
              name='mobileNumber'
              errorText='mobile not valid!'
              value={formState.inputValues.mobileNumber}
              onInputChange={inputChangeHandler}
              initiallyValid={false}
              required
            />
          </div>
        </form>
      </section>

      <section className='placeorder-section'>
        <div style={{ display: 'flex' }}>
          <Title title='Payment' />
        </div>
        <ul className='orderitems payment-summary'>
          <li className='placeorder-itemlist'>
            <div className='item-column'>Item Subtotal</div>
            <div className='item-column'>:</div>
            <div className='item-column'>${cart.mealsPrice}</div>
          </li>
          <li className='placeorder-itemlist'>
            <div className='item-column'>Service Fee</div>
            <div className='item-column'>:</div>
            <div className='item-column'>${cart.serviceFee}</div>
          </li>
          <li className='placeorder-itemlist'>
            <div className='item-column'>Tax</div>
            <div className='item-column'>:</div>
            <div className='item-column'>${cart.taxPrice}</div>
          </li>
          <li
            style={{ fontSize: '1em', fontWeight: 'bold' }}
            className='placeorder-itemlist'
          >
            <div className='item-column'>Total</div>
            <div className='item-column'>:</div>
            <div className='item-column'>${cart.totalPrice}</div>
          </li>
        </ul>

        <div style={{ display: 'inline-block' }}>
          {formState.formIsValid ? (
            <StripeCheckout
              stripeKey='pk_test_BbuVbJumpNKWuxCFdOAUYoix00ZZvbAiJk'
              // token={makePayment}
              name={'lux-beach-resort'}
              amount={cart.totalPrice * 100}
              description='meal order'
              currency='AUD'
            >
              <button type='button' className='btn-primary action-btn'>
                {`Pay for $${cart.totalPrice}`}
              </button>
            </StripeCheckout>
          ) : (
            <button
              type='button'
              onClick={() => alert('Your Details are not valid!')}
              className='btn-primary action-btn'
            >
              {`Pay for $${cart.totalPrice}`}
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

export default PlaceOrderScreen;