import React from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';

import {Provider as PaperProvider} from 'react-native-paper';
import {enableScreens} from 'react-native-screens';

import Navigator from './Screens/Navigator';

import store, {persitor} from './store';
import {PersistGate} from 'redux-persist/integration/react';

enableScreens();

const App = () => (
  <Provider store={store}>
    <PersistGate persistor={persitor}>
      <PaperProvider>
        <StatusBar
          barStyle="light-content"
          backgroundColor={'transparent'}
          translucent={true}
        />
        <Navigator />
      </PaperProvider>
    </PersistGate>
  </Provider>
);

export default App;
