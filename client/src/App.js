import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import HomeScreen from './screens/HomeScreen';
import RoomsScreen from './screens/RoomsScreen';
import SingleRoomScreen from './screens/SingleRoomScreen';
import ErrorScreen from './screens/ErrorScreen';
import Navbar from './components/Navbar';
import EditRoomScreen from './screens/EditRoomScreen';

const App = () => {
  return (
    <>
      <Navbar />
      <Switch>
        <Route path='/rooms' component={RoomsScreen} exact />
        <Route path='/rooms/:id' component={SingleRoomScreen} />
        <Route path='/room/:id?/edit' component={EditRoomScreen} />
        <Route path='/' component={HomeScreen} exact />
        <Route component={ErrorScreen} />
      </Switch>
    </>
  );
};

export default App;
