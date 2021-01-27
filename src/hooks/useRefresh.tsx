import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '~/store';

import {fetchMovieData} from '~/store/movie';
import {fetchTVData} from '~/store/tv';

const useRefresh = (isMovie = true) => {
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const {value} = useSelector((state: RootState) => state.language);

  const page = Math.floor(Math.random() * 5 + 1);

  const handleRefresh = async () => {
    setRefreshing(true);
    dispatch(
      isMovie
        ? await fetchMovieData({page, value})
        : await fetchTVData({page, value}),
    );
    setTimeout(() => {
      setRefreshing(false);
    }, 100);
  };

  return {handleRefresh, refreshing};
};

export default useRefresh;
