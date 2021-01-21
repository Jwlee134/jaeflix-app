import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {setLanguage} from '~/store/language';

import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import en from '~/i18n/en.json';
import ko from '~/i18n/ko.json';

const useInitialize = () => {
  const [initialize, setInitialize] = useState(true);
  const dispatch = useDispatch();

  const resources = {
    'en-US': {
      translations: en,
    },
    'ko-KR': {
      translations: ko,
    },
  };

  const handleI18n = (value: string) => {
    i18n.use(initReactI18next).init({
      fallbackLng: value,
      lng: value,
      resources,
      debug: true,
      ns: ['translations'],
      defaultNS: 'translations',
    });
  };

  const handleLanguage = async () => {
    const value = await AsyncStorage.getItem('language');
    if (value) {
      dispatch(setLanguage(value));
      handleI18n(value);
    } else if (!value) {
      await AsyncStorage.setItem('language', 'ko-KR');
      handleI18n('ko-KR');
    }
    setInitialize(false);
  };

  return {initialize, handleLanguage};
};

export default useInitialize;
