import axios from 'axios';
import {API_KEY} from '@env';
import {MovieApi} from './@types';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: API_KEY,
    language: 'ko-KR',
  },
});

export const movieApi: MovieApi = {
  nowPlaying: () => api.get('/movie/now_playing'),
  upcoming: () => api.get('/movie/upcoming'),
  popular: () => api.get('/movie/popular'),
  topRated: () => api.get('/movie/top_rated'),
};
