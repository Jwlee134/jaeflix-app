import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '~/store';

import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import en from '~/i18n/en.json';
import ko from '~/i18n/ko.json';

const useInitialize = () => {
  const {value} = useSelector((state: RootState) => state.language);
  const [initialize, setInitialize] = useState(true);

  const resources = {
    'en-US': {
      translations: en,
    },
    'ko-KR': {
      translations: ko,
    },
  };

  const handleI18n = () => {
    i18n.use(initReactI18next).init({
      fallbackLng: value,
      lng: value,
      resources,
      ns: ['translations'],
      defaultNS: 'translations',
    });
  };

  const handleLanguage = async () => {
    handleI18n();
    setInitialize(false);
  };

  return {initialize, handleLanguage};
};

export default useInitialize;
