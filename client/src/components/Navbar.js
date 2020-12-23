import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { FaAlignRight } from 'react-icons/fa';

const Navbar = () => {
  const history = useHistory();

  const [isOpen, setIsOpen] = useState(false);

  const currentUser = useSelector((state) => state.currentUser);
  const { user, isAuthenticated } = currentUser;

  const loginHandler = () => {
    history.push('/login');
  };

  return (
    <nav className='navbar'>
      <div className='nav-center'>
        <div className='nav-header'>
          <Link to='/'>
            <img src='/images/logo.svg' alt='Beach Resort' />
          </Link>
          <button
            type='button'
            className='nav-btn'
            onClick={() => setIsOpen((prevstate) => !prevstate)}
          >
            <FaAlignRight className='nav-icon' />
          </button>
        </div>
        <ul className={isOpen ? 'nav-links show-nav' : 'nav-links'}>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/rooms'>Rooms</Link>
          </li>
          {isAuthenticated && user ? (
            <li className='profile-dropdown'>
              {user.name.split(' ')[0]}{' '}
              <i className='fas fa-caret-down fa-lg'></i>
              <div className='dropdown-content'>
                <Link to='/'>Profile</Link>
                <a href='/api/auth/logout'>Logout</a>
              </div>
            </li>
          ) : (
            <li onClick={loginHandler} className='profile-dropdown'>
              Login
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
