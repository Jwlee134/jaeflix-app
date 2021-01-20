import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '~/store';
import {fetchMovieData} from '~/store/movie';

const useLanguage = () => {
  const {value} = useSelector((state: RootState) => state.language);
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const showDialog = () => setVisible(true);

  const hideDialog = () => {
    setVisible(false);
    AsyncStorage.setItem('language', value);
    dispatch(fetchMovieData(value as string));
  };

  return {visible, showDialog, hideDialog};
};

export default useLanguage;
