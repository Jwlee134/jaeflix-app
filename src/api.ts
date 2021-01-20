import axios from 'axios';
import {API_KEY} from '@env';
import {MovieApi, TVApi} from './@types';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: API_KEY,
  },
});

const page = Math.round(Math.random() * 2 + 1);

export const movieApi: MovieApi = {
  nowPlaying: (language: string) =>
    api.get('/movie/now_playing', {
      params: {
        page,
        language,
      },
    }),
  upcoming: (language: string) =>
    api.get('/movie/upcoming', {
      params: {
        page,
        language,
      },
    }),
  popular: (language: string) =>
    api.get('/movie/popular', {
      params: {
        page,
        language,
      },
    }),
  topRated: (language: string) =>
    api.get('/movie/top_rated', {
      params: {
        page,
        language,
      },
    }),
  detail: (id: number, language: string) =>
    api.get(`/movie/${id}`, {
      params: {
        append_to_response: 'videos',
        language,
      },
    }),
  similar: (id: number, language: string) =>
    api.get(`/movie/${id}/similar`, {
      params: {
        language,
      },
    }),
  credits: (id: number, language: string) =>
    api.get(`/movie/${id}/credits`, {
      params: {
        language,
      },
    }),
  search: (term: string, language: string) =>
    api.get('/search/movie', {
      params: {
        query: term,
        language,
      },
    }),
};

export const tvApi: TVApi = {
  airingToday: (language: string) =>
    api.get('/tv/airing_today', {
      params: {
        page,
        language,
      },
    }),
  popular: (language: string) =>
    api.get('/tv/popular', {
      params: {
        page,
        language,
      },
    }),
  topRated: (language: string) =>
    api.get('/tv/top_rated', {
      params: {
        page,
        language,
      },
    }),
  upcoming: (language: string) =>
    api.get('/tv/on_the_air', {
      params: {
        page,
        language,
      },
    }),
  detail: (id: number, language: string) =>
    api.get(`/tv/${id}`, {
      params: {
        append_to_response: 'videos',
        language,
      },
    }),
  similar: (id: number, language: string) =>
    api.get(`/tv/${id}/similar`, {
      params: {
        language,
      },
    }),
  credits: (id: number, language: string) =>
    api.get(`/tv/${id}/credits`, {
      params: {
        language,
      },
    }),
  search: (term: string, language: string) =>
    api.get('/search/tv', {
      params: {
        query: term,
        language,
      },
    }),
};
