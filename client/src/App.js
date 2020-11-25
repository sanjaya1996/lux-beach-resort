import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';

import HomeScreen from './screens/HomeScreen';
import RoomsScreen from './screens/RoomsScreen';
import SingleRoomScreen from './screens/SingleRoomScreen';
import ErrorScreen from './screens/ErrorScreen';

const App = () => {
  return (
    <>
      <Switch>
        <Route exact path='/' component={HomeScreen} />
        <Route exact path='/rooms' component={RoomsScreen} />
        <Route path='/rooms/:id' component={SingleRoomScreen} />
        <Route component={ErrorScreen} />
      </Switch>
    </>
  );
};

export default App;
