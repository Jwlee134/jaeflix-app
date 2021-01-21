import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '~/store';

import {fetchMovieData} from '~/store/movie';
import {fetchTVData} from '~/store/tv';

const useRefresh = (isMovie = true) => {
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const {value} = useSelector((state: RootState) => state.language);

  const page = Math.round(Math.random() * 5 + 1);

  const handleRefresh = () => {
    setRefreshing(true);
    dispatch(
      isMovie ? fetchMovieData({page, value}) : fetchTVData({page, value}),
    );
    setRefreshing(false);
  };

  return {handleRefresh, refreshing};
};

export default useRefresh;
