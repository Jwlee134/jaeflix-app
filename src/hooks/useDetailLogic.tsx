import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Cast, Crew, Movie, MovieDetail, TV, TVDetail} from '~/@types';
import {movieApi, tvApi} from '~/api';
import {RootState} from '~/store';

const useDetailLogic = (id: number, name: string) => {
  const [detail, setDetail] = useState<MovieDetail | TVDetail | null>(null);
  const [casts, setCasts] = useState<Cast[]>([]);
  const [crews, setCrews] = useState<Crew[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [similar, setSimilar] = useState<Movie[] | TV[]>([]);

  const {value} = useSelector((state: RootState) => state.language);

  const fetchMovieDetail = async () => {
    try {
      setLoading(true);
      const {data} = await movieApi.detail(id, value);
      const {
        data: {cast, crew},
      } = await movieApi.credits(id, value);
      const {
        data: {results},
      } = await movieApi.similar(id, value);
      setDetail(data);
      setCasts(cast);
      setCrews(crew);
      setSimilar(results);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setError('상세 정보를 불러오는 데 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const fetchTVDetail = async () => {
    try {
      setLoading(true);
      const {data} = await tvApi.detail(id, value);
      const {
        data: {cast, crew},
      } = await tvApi.credits(id, value);
      const {
        data: {results},
      } = await tvApi.similar(id, value);
      setDetail(data);
      setCasts(cast);
      setCrews(crew);
      setSimilar(results);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setError('상세 정보를 불러오는 데 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (name === 'MovieDetail') {
        fetchMovieDetail();
      } else if (name === 'TVDetail') {
        fetchTVDetail();
      } else if (name === 'SearchMovieDetail') {
        fetchMovieDetail();
      } else {
        fetchTVDetail();
      }
    }, 100);
  }, []);

  return {detail, casts, crews, loading, error, similar};
};

export default useDetailLogic;
