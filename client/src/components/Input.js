import React, { useReducer, useEffect } from 'react';

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true,
      };
    default:
      return state;
  }
};

const Input = (props) => {
  // name should be act as a unique id
  const {
    label,
    type,
    name,
    initialValue,
    initiallyValid,
    onInputChange,
    errorText,
  } = props;

  const [inputState, dispatch] = useReducer(inputReducer, {
    value: initialValue ? initialValue : '',
    isValid: initiallyValid,
    touched: false,
  });

  useEffect(() => {
    onInputChange(name, inputState.value, inputState.isValid);
  }, [name, inputState, onInputChange]);

  const textChangeHandler = (event) => {
    const inputText = event.target.value;
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let isValid = true;
    if (props.required && inputText.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(inputText.toLowerCase())) {
      isValid = false;
    }
    dispatch({ type: INPUT_CHANGE, value: inputText, isValid });
  };

  const lostFocusHandler = () => {
    dispatch({ type: INPUT_BLUR });
  };

  return (
    <>
      <label htmlFor={name} className='summary-label'>
        {label}{' '}
        {inputState.touched && !inputState.isValid && (
          <span
            style={{
              padding: 0,
              fontWeight: 'normal',
              fontStyle: 'italic',
              fontSize: '0.6rem',
              color: 'red',
            }}
          >
            {errorText}
          </span>
        )}
      </label>

      <input
        type={type}
        name={name}
        value={inputState.value}
        onChange={textChangeHandler}
        onBlur={lostFocusHandler}
        className={`form-control ${
          inputState.touched && !inputState.isValid && 'input-error'
        }`}
      />
    </>
  );
};

export default Input;
