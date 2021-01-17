import {AxiosResponse} from 'axios';

// Context
interface IUserInfo {
  name: string;
  email: string;
}

interface IUserContext {
  isLoaded: boolean;
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

type VideoSize = 360 | 480 | 720 | 1080;

type VideoType =
  | 'Trailer'
  | 'Teaser'
  | 'Clip'
  | 'Featurette'
  | 'Behind the Scenes'
  | 'Bloopers';

interface Video {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  site: string;
  size: VideoSize;
  type: VideoType;
}

interface Companies {
  name: string;
  id: number;
  logo_path: string | null;
  origin_country: string;
}

interface Countries {
  iso_3166_1: string;
  name: string;
}

interface Languages {
  iso_639_1: string;
  name: string;
}

interface Movie {
  poster_path: string | null;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: number[];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string | null;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
}

interface MovieList {
  page: number;
  results: Movie[];
  dates: object;
  total_pages: number;
  total_results: number;
}

interface MovieDetail {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: Object | null;
  budget: number;
  genres: Genre[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  original_language: string;
  original_title: string;
  popularity: number;
  poster_path: string | null;
  production_companies: Companies[];
  production_countries: Countries[];
  release_date: string;
  revenue: number;
  runtime: number | null;
  spoken_languages: Languages[];
  status: string;
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

// API
interface MovieApi {
  nowPlaying: () => Promise<AxiosResponse<MovieList>>;
  upcoming: () => Promise<AxiosResponse<MovieList>>;
  popular: () => Promise<AxiosResponse<MovieList>>;
  topRated: () => Promise<AxiosResponse<MovieList>>;
}
