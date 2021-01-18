import React from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';

import Navigator from './Screens/Navigator';
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={'transparent'}
        translucent={true}
      />
      <Navigator />
    </Provider>
  );
};

export default App;
