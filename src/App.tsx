import React from 'react';
import {StatusBar} from 'react-native';
import {UserContextProvider} from './Context/User';
import Navigator from './Screens/Navigator';

const App = () => {
  return (
    <UserContextProvider>
      <StatusBar barStyle="light-content" />
      <Navigator />
    </UserContextProvider>
  );
};

export default App;
