import React, {useState} from 'react';
import RNRestart from 'react-native-restart';

import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '~/store';

import LanguageDialog from '~/Components/LanguageDialog';
import {useTranslation} from 'react-i18next';
import {movieApi, tvApi} from '~/api';
import {
  addMovie,
  addTV,
  refreshMovieList,
  refreshTVList,
} from '~/store/wishList';
import RestartDialog from '~/Components/RestartDialog';

const useLanguage = () => {
  const {value} = useSelector((state: RootState) => state.language);
  const {movieList, tvList} = useSelector((state: RootState) => state.wishList);
  const {i18n} = useTranslation();
  const [visible, setVisible] = useState(false);
  const [restartVisible, setRestartVisible] = useState(false);
  const dispatch = useDispatch();

  const changelanguage = (lng: string) => i18n.changeLanguage(lng);

  const showDialog = () => setVisible(true);

  const handleList = (language: string) => {
    if (movieList.length > 0) {
      dispatch(refreshMovieList());
      const copy = movieList.slice();
      copy.forEach(async (item) => {
        const {data} = await movieApi.detail(item.id, language);
        dispatch(addMovie(data));
      });
    }
    if (tvList.length > 0) {
      dispatch(refreshTVList());
      const copy = tvList.slice();
      copy.forEach(async (item) => {
        const {data} = await tvApi.detail(item.id, language);
        dispatch(addTV(data));
      });
    }
  };

  const saveLanguage = () => {
    setVisible(false);
    setRestartVisible(true);
    if (value === 'ko-KR') {
      handleList(value);
      changelanguage('ko');
    } else {
      handleList(value);
      changelanguage('en');
    }
    setTimeout(() => {
      RNRestart.Restart();
    }, 1500);
  };

  const closeDialog = () => setVisible(false);

  const renderRestartDialog = () => <RestartDialog visible={restartVisible} />;

  const renderDialog = () => (
    <LanguageDialog
      value={value}
      dispatch={dispatch}
      visible={visible}
      saveLanguage={saveLanguage}
      closeDialog={closeDialog}
    />
  );

  return {showDialog, renderDialog, renderRestartDialog};
};

export default useLanguage;
