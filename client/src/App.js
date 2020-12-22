import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './App.css';

import HomeScreen from './screens/HomeScreen';
import RoomsScreen from './screens/RoomsScreen';
import SingleRoomScreen from './screens/SingleRoomScreen';
import ErrorScreen from './screens/ErrorScreen';
import Navbar from './components/Navbar';
import EditRoomScreen from './screens/EditRoomScreen';
import CartScreen from './screens/CartScreen';
import PaymentScreen from './screens/PaymentScreen';
import MessageScreen from './screens/MessageScreen';
import LoginScreen from './screens/LoginScreen';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('I am called');
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Switch>
        <Route path='/rooms' component={RoomsScreen} exact />
        <Route path='/rooms/:id' component={SingleRoomScreen} />
        <Route path='/room/:id?/edit' component={EditRoomScreen} />
        <Route path='/cart/:id?' component={CartScreen} />
        <Route
          path='/payment/:id/:guests/:chkin/:chkout'
          component={PaymentScreen}
        />
        <Route path='/success/:title/:message' component={MessageScreen} />
        <Route path='/error/:title/:message' component={MessageScreen} />
        <Route path='/login' component={LoginScreen} />
        <Route path='/' component={HomeScreen} exact />
        <Route component={ErrorScreen} />
      </Switch>
    </>
  );
};

export default App;
