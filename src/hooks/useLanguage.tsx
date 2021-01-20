import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';

import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '~/store';

import LanguageDialog from '~/Components/LanguageDialog';

const useLanguage = () => {
  const {value} = useSelector((state: RootState) => state.language);
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const showDialog = () => setVisible(true);

  const hideDialog = async () => {
    setVisible(false);
    const currentValue = await AsyncStorage.getItem('language');
    if (currentValue !== value) {
      await AsyncStorage.setItem('language', value);
      RNRestart.Restart();
    }
  };

  const renderDialog = () => (
    <LanguageDialog
      value={value}
      dispatch={dispatch}
      visible={visible}
      hideDialog={hideDialog}
    />
  );

  return {showDialog, renderDialog};
};

export default useLanguage;
