import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const API_URI = process.env.REACT_APP_API_URI;

const LoginScreen = ({ history }) => {
  const currentUser = useSelector((state) => state.currentUser);
  const { isAuthenticated } = currentUser;

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }
  }, [isAuthenticated, history]);

  return (
    <div className='centered'>
      <div className='login-btns-container'>
        <a
          href={`${API_URI}/api/auth/google`}
          className='login-btn login-btn-google'
        >
          <i className='fab fa-google'></i> Continue with Google
        </a>
        <a
          href={`${API_URI}/api/auth/facebook`}
          className='login-btn login-btn-facebook'
        >
          <i className='fab fa-facebook-f'></i> Continue with Facebook
        </a>
      </div>
    </div>
  );
};

export default LoginScreen;
