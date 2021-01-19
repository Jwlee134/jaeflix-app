import React, {useState} from 'react';
import {useDispatch} from 'react-redux';

import {fetchMovieData} from '~/store/movie';
import {fetchTVData} from '~/store/tv';

const useRefresh = (isMovie = true) => {
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();

  const handleRefresh = () => {
    setRefreshing(true);
    dispatch(isMovie ? fetchMovieData() : fetchTVData());
    setRefreshing(false);
  };

  return {handleRefresh, refreshing};
};

export default useRefresh;
