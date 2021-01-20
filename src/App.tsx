import React from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';

import {Provider as PaperProvider} from 'react-native-paper';
import {enableScreens} from 'react-native-screens';

import Navigator from './Screens/Navigator';

import store from './store';

enableScreens();

const App = () => {
  return (
    <Provider store={store}>
      <PaperProvider>
        <StatusBar
          barStyle="light-content"
          backgroundColor={'transparent'}
          translucent={true}
        />
        <Navigator />
      </PaperProvider>
    </Provider>
  );
};

export default App;
