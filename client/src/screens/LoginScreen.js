import React from 'react';

const LoginScreen = () => {
  return (
    <div className='centered'>
      <div className='login-btns-container'>
        <button className='login-btn login-btn-google'>
          <i className='fab fa-google'></i> Continue with Google
        </button>
        <button className='login-btn login-btn-facebook'>
          <i className='fab fa-facebook-f'></i> Continue with Facebook
        </button>
      </div>
    </div>
  );
};

export default LoginScreen;
