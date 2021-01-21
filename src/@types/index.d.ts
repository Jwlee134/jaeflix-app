import {AxiosResponse} from 'axios';

// Navigation

type MovieNaviParamList = {
  MovieHome: undefined;
  Detail: {
    id: number;
    title: string;
  };
};

type TVNaviParamList = {
  TVHome: undefined;
  Detail: {
    id: number;
    title: string;
  };
};

type SearchNaviParamList = {
  Search: undefined;
  Detail: {
    id: number;
    title: string;
  };
};

type WishListNaviParamList = {
  WishList: undefined;
  Detail: {
    id: number;
    title: string;
  };
};

// Movie & TV

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

interface CreatedBy {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string | null;
}

interface LastEpisodeToAir {
  air_date: string;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  season_number: number;
  still_path: string | null;
  vote_average: number;
  vote_count: number;
}

interface Networks {
  name: string;
  id: number;
  logo_path: string | null;
  origin_country: string;
}

interface Seasons {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
}

interface CommonItems {
  id: number;
  poster_path: string | null;
  overview: string;
  original_;
  backdrop_path: string | null;
  popularity: number;
  vote_count: number;
  vote_average: number;
}

interface Movie extends CommonItems {
  title: string;
  original_title: string;
  release_date: string;
  video: boolean;
  adult: boolean;
  genre_ids: number[];
}

interface TV extends CommonItems {
  first_air_date: string;
  origin_country: string[];
  name: string;
  original_name: string;
  genre_ids: number[];
}

interface TVDetail extends TV {
  created_by: CreatedBy[];
  episode_run_time: number[];
  genres: Genre[];
  homepage: string;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  next_episode_to_air: null;
  last_episode_to_air: LastEpisodeToAir;
  networks: Networks[];
  number_of_episodes: number;
  number_of_seasons: number;
  production_companies: Companies[];
  production_countries: Countries[];
  seasons: Seasons[];
  spoken_languages: Languages[];
  status: string;
  tagline: string;
  type: string;
  videos: {
    results: Video[];
  };
}

interface CommonList<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

interface MovieDetail extends Movie {
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
  videos: {
    results: Video[];
  };
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
  nowPlaying: (
    page: number,
    language: string,
  ) => Promise<AxiosResponse<CommonList<Movie>>>;
  upcoming: (
    page: number,
    language: string,
  ) => Promise<AxiosResponse<CommonList<Movie>>>;
  popular: (
    page: number,
    anguage: string,
  ) => Promise<AxiosResponse<CommonList<Movie>>>;
  topRated: (
    page: number,
    language: string,
  ) => Promise<AxiosResponse<CommonList<Movie>>>;
  detail: (id: number, language: string) => Promise<AxiosResponse<MovieDetail>>;
  similar: (
    id: number,
    language: string,
  ) => Promise<AxiosResponse<CommonList<Movie>>>;
  credits: (id: number, language: string) => Promise<AxiosResponse<Credits>>;
  search: (
    term: string,
    language: string,
  ) => Promise<AxiosResponse<CommonList<Movie>>>;
}

interface TVApi {
  airingToday: (
    page: number,
    language: string,
  ) => Promise<AxiosResponse<CommonList<TV>>>;
  popular: (
    page: number,
    language: string,
  ) => Promise<AxiosResponse<CommonList<TV>>>;
  topRated: (
    page: number,
    language: string,
  ) => Promise<AxiosResponse<CommonList<TV>>>;
  upcoming: (
    page: number,
    language: string,
  ) => Promise<AxiosResponse<CommonList<TV>>>;
  detail: (id: number, language: string) => Promise<AxiosResponse<TVDetail>>;
  similar: (
    id: number,
    language: string,
  ) => Promise<AxiosResponse<CommonList<TV>>>;
  credits: (id: number, language: string) => Promise<AxiosResponse<Credits>>;
  search: (
    term: string,
    language: string,
  ) => Promise<AxiosResponse<CommonList<TV>>>;
}
