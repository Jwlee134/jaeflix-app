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

  const saveLanguage = async () => {
    setVisible(false);
    if (value === 'ko-KR') {
      changelanguage('ko');
      RNRestart.Restart();
    }
    if (value === 'en-US') {
      changelanguage('en');
      RNRestart.Restart();
    }
  };

  const closeDialog = () => setVisible(false);

  const renderDialog = () => (
    <LanguageDialog
      value={value}
      dispatch={dispatch}
      visible={visible}
      saveLanguage={saveLanguage}
      closeDialog={closeDialog}
    />
  );

  return {showDialog, renderDialog};
};

export default useLanguage;
