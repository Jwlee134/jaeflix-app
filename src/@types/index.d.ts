import {AxiosResponse} from 'axios';

// Context
interface IUserInfo {
  name: string;
  email: string;
}

interface IUserContext {
  isLoading: boolean;
  userInfo: IUserInfo | undefined;
  login: (email: string, password: string) => void;
  getUserInfo: () => void;
  logout: () => void;
}

// Navigation
type LoginNaviParamList = {
  Login: undefined;
};

type MovieNaviParamList = {
  MovieHome: undefined;
  MovieDetail: {
    id: number;
  };
};

// Movie
interface Genre {
  id: number;
  name: string;
}

interface Video {
  id: string;
  key: string;
  name: string;
}

interface Movie {
  backdrop_path: string;
  id: number;
  title: string;
  tagline: string;
  release_date: string;
  poster_path: string;
  overview: string;
  genres: Genre[];
  vote_average: number;
  videos: {
    results: Video[];
  };
}

// API
interface MovieApi {
  nowPlaying: () => Promise<AxiosResponse<Movie[]>>;
  upcoming: () => Promise<AxiosResponse<Movie[]>>;
  popular: () => Promise<AxiosResponse<Movie[]>>;
  topRated: () => Promise<AxiosResponse<Movie[]>>;
}
