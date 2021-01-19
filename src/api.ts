import axios from 'axios';
import {API_KEY} from '@env';
import {MovieApi, TVApi} from './@types';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: API_KEY,
    language: 'ko-KR',
  },
});

const page = Math.round(Math.random() * 2 + 1);

export const movieApi: MovieApi = {
  nowPlaying: () =>
    api.get('/movie/now_playing', {
      params: {
        page,
      },
    }),
  upcoming: () =>
    api.get('/movie/upcoming', {
      params: {
        page,
      },
    }),
  popular: () =>
    api.get('/movie/popular', {
      params: {
        page,
      },
    }),
  topRated: () =>
    api.get('/movie/top_rated', {
      params: {
        page,
      },
    }),
  detail: (id: number) =>
    api.get(`/movie/${id}`, {
      params: {
        append_to_response: 'videos',
      },
    }),
  similar: (id: number) => api.get(`/movie/${id}/similar`),
  credits: (id: number) => api.get(`/movie/${id}/credits`),
  search: (term: string) =>
    api.get('/search/movie', {
      params: {
        query: term,
      },
    }),
};

export const tvApi: TVApi = {
  airingToday: () =>
    api.get('/tv/airing_today', {
      params: {
        page,
      },
    }),
  popular: () =>
    api.get('/tv/popular', {
      params: {
        page,
      },
    }),
  topRated: () =>
    api.get('/tv/top_rated', {
      params: {
        page,
      },
    }),
  upcoming: () =>
    api.get('/tv/on_the_air', {
      params: {
        page,
      },
    }),
  detail: (id: number) =>
    api.get(`/tv/${id}`, {
      params: {
        append_to_response: 'videos',
      },
    }),
  similar: (id: number) => api.get(`/tv/${id}/similar`),
  credits: (id: number) => api.get(`/tv/${id}/credits`),
  search: (term: string) =>
    api.get('/search/tv', {
      params: {
        query: term,
      },
    }),
};
