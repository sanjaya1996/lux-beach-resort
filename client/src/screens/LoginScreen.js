import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

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
        <a href={'/api/auth/google'} className='login-btn login-btn-google'>
          <i className='fab fa-google'></i> Continue with Google
        </a>
        <a href={'/api/auth/facebook'} className='login-btn login-btn-facebook'>
          <i className='fab fa-facebook-f'></i> Continue with Facebook
        </a>
      </div>
    </div>
  );
};

export default LoginScreen;
