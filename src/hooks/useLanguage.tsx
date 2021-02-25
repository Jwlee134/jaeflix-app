import React, {useState} from 'react';
import RNRestart from 'react-native-restart';

import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '~/store';

import LanguageDialog from '~/Components/LanguageDialog';
import {useTranslation} from 'react-i18next';
import {movieApi, tvApi} from '~/api';
import {replaceMovieList, replaceTVLIst} from '~/store/wishList';
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

  const handleList = async (language: string) => {
    if (movieList.length > 0) {
      const languageChangedList = await Promise.all(
        movieList.map(async (movie) => {
          const {data} = await movieApi.detail(movie.id, language);
          return data;
        }),
      );
      dispatch(replaceMovieList(languageChangedList));
    }
    if (tvList.length > 0) {
      const languageChangedList = await Promise.all(
        tvList.map(async (tv) => {
          const {data} = await tvApi.detail(tv.id, language);
          return data;
        }),
      );
      dispatch(replaceTVLIst(languageChangedList));
    }
  };

  const saveLanguage = async () => {
    setVisible(false);
    setRestartVisible(true);
    if (value === 'ko-KR') {
      await handleList(value);
      changelanguage('ko');
    } else {
      await handleList(value);
      changelanguage('en');
    }
    RNRestart.Restart();
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
