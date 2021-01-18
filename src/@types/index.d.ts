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
  Detail: {
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

interface CommonItems {
  id: number;
  poster_path: string | null;
  adult: boolean;
  overview: string;
  release_date: string;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string | null;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
}

interface Movie extends CommonItems {
  genre_ids: number[];
}

interface MovieList {
  page: number;
  results: Movie[];
  dates: object;
  total_pages: number;
  total_results: number;
}

interface MovieDetail extends CommonItems {
  belongs_to_collection: Object | null;
  budget: number;
  genres: Genre[];
  homepage: string | null;
  imdb_id: string | null;
  production_companies: Companies[];
  production_countries: Countries[];
  revenue: number;
  runtime: number | null;
  spoken_languages: Languages[];
  status: string;
  tagline: string | null;
}

interface CommonCredit {
  adult: boolean;
  gender: number | null;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  credit_id: string;
}

interface Cast extends CommonCredit {
  cast_id: number;
  character: string;
  order: number;
}

interface Crew extends CommonCredit {
  department: string;
  job: string;
}

interface Credits {
  id: number;
  cast: Cast[];
  crew: Crew[];
}

// API
interface MovieApi {
  nowPlaying: () => Promise<AxiosResponse<MovieList>>;
  upcoming: () => Promise<AxiosResponse<MovieList>>;
  popular: () => Promise<AxiosResponse<MovieList>>;
  topRated: () => Promise<AxiosResponse<MovieList>>;
  detail: (id: number) => Promise<AxiosResponse<MovieDetail>>;
  similar: (id: number) => Promise<AxiosResponse<MovieList>>;
  credits: (id: number) => Promise<AxiosResponse<Credits>>;
}
