import React, {
  useReducer,
  useCallback,
  useEffect,
  useState,
  useMemo,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import StripeCheckout from 'react-stripe-checkout';

import AlertBox from '../../components/AlertBox';
import Title from '../../components/Title';
import Input from '../../components/Input';
import Loading from '../../components/Loading';
import * as mealOrderActions from '../../store/actions/mealOrders';
import { MEAL_ORDER_RESET } from '../../store/reducers/mealOrders';

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

const PlaceOrderScreen = ({ history }) => {
  const [showError, setShowError] = useState(false);

  const currentUser = useSelector((state) => state.currentUser);
  const { user } = currentUser;

  const getUser = useMemo(() => {
    return user;
  }, [user]);

  const cart = useSelector((state) => state.cart);
  const { meals } = cart;

  const dispatch = useDispatch();

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

  const mealOrder = useSelector((state) => state.mealOrder);
  const { loading, error, success } = mealOrder;

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      fName: '',
      lName: '',
      title: 'Mr',
      mobileNumber: '',
      pickupTime: inititalPickupTime,
      pickupNote: '',
    },
    inputValidities: {
      email: false,
      fName: false,
      lName: true,
      title: true,
      mobileNumber: false,
      pickupTime: true,
      pickupNote: true,
    },
    formIsValid: false,
  });

  useEffect(() => {
    if (success) {
      const title = 'Thank You !';
      const message =
        'Your order has been placed successfully, Please show OrderId from your email while picking up your food.';
      history.push(`/success/${title}/${message}`);
      dispatch({ type: MEAL_ORDER_RESET });
    } else if (user) {
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
  }, [success, dispatch, history, user]);

  const makePayment = (token) => {
    const name =
      formState.inputValues.fName + ' ' + formState.inputValues.lName;
    const email = formState.inputValues.email;
    const phone = formState.inputValues.mobileNumber;
    const title = formState.inputValues.title;
    const pickupTime = formState.inputValues.pickupTime;
    const pickupNote = formState.inputValues.pickupNote;

    dispatch(
      mealOrderActions.orderMeal(
        token,
        cart.totalPrice,
        meals,
        pickupTime,
        pickupNote,
        {
          name,
          email,
          phone,
          title,
        }
      )
    );
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

  const alertCloseHandler = () => {
    dispatch({ type: MEAL_ORDER_RESET });
  };

  if (loading) {
    return <Loading />;
  }

  if (meals.length === 0) {
    return <AlertBox message='Your Cart is Empty !' type='message' noBtn />;
  }

  return (
    <div className='screen'>
      {error && (
        <AlertBox message={'Error! ' + error} onClose={alertCloseHandler} />
      )}
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
          {/* <label htmlFor='date'>Pickup Note :</label>{' '}
          <textarea
          name= 'pickupNote'
            rows='2'
            cols='50'
            maxLength='200'
            className='form-control'
          /> */}
          <Input
            label='Pickup Note : '
            placeholder='Leave a note for the resturant'
            type='text'
            name='pickupNote'
            onInputChange={inputChangeHandler}
            initialValue=''
            initiallyValid={true}
            showError={showError}
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
              showError={showError}
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
              showError={showError}
              getUser={getUser}
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
              token={makePayment}
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
              onClick={() => {
                alert('Your Details are not valid!');
                setShowError(true);
              }}
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
