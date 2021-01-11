import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { FaAlignRight } from 'react-icons/fa';
import { CHECK_AVAILABILITY_RESET } from '../store/reducers/rooms';

const Navbar = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const currentUser = useSelector((state) => state.currentUser);
  const { user, isAuthenticated } = currentUser;

  const cart = useSelector((state) => state.cart);
  const { rooms, meals } = cart;

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
        <ul
          className={
            isOpen && !isAuthenticated
              ? 'nav-links show-nav-min-height'
              : isOpen
              ? 'nav-links show-nav'
              : 'nav-links'
          }
        >
          <li>
            <Link to='/rooms'>Rooms</Link>
          </li>

          <li>
            <Link to='/menu'>Menu</Link>
          </li>
          {rooms.length + meals.length > 0 && (
            <li>
              <Link
                to='/cart'
                onClick={() => dispatch({ type: CHECK_AVAILABILITY_RESET })}
              >
                <span>Cart</span>
                <i className='fas fa-shopping-cart' id='cart'>
                  <span className='cart-count'>
                    {rooms.length + meals.length}
                  </span>
                </i>
              </Link>
            </li>
          )}
          <div className='profile-dropdown-align'>
            {isAuthenticated && user ? (
              <>
                {user.is_admin && (
                  <li className='profile-dropdown'>
                    <Link to='#'>
                      Admin
                      <i className='fas fa-caret-down fa-lg'></i>
                    </Link>
                    <div className='dropdown-content'>
                      <Link to='/admin/roomlist'>Rooms</Link>
                      <Link to='/admin/bookinglist'>Bookings</Link>
                      <Link to='/admin/orderlist'>Orders</Link>
                    </div>
                  </li>
                )}
                <li className='profile-dropdown'>
                  <Link to='#'>
                    {user.name.split(' ')[0]}
                    <i className='fas fa-caret-down fa-lg'></i>
                  </Link>
                  <div className='dropdown-content'>
                    <Link to='/profile'>Profile</Link>
                    <a href='/api/auth/logout'>Logout</a>
                  </div>
                </li>
              </>
            ) : (
              <li onClick={loginHandler}>
                <Link to='/login'>Login</Link>
              </li>
            )}
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
