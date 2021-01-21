import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';

import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '~/store';

import LanguageDialog from '~/Components/LanguageDialog';
import {useTranslation} from 'react-i18next';

const useLanguage = () => {
  const {value} = useSelector((state: RootState) => state.language);
  const {i18n} = useTranslation();
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const changelanguage = (lng: string) => i18n.changeLanguage(lng);

  const showDialog = () => setVisible(true);

  const hideDialog = async () => {
    setVisible(false);
    const currentValue = await AsyncStorage.getItem('language');
    if (currentValue !== value && value === 'ko-KR') {
      await AsyncStorage.setItem('language', value);
      changelanguage('ko');
      RNRestart.Restart();
    }
    if (currentValue !== value && value === 'en-US') {
      await AsyncStorage.setItem('language', value);
      changelanguage('en');
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
