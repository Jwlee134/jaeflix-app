import {Movie, MovieDetail, TV, TVDetail} from '.';

export const isMovieDetail = (
  target: MovieDetail | TVDetail | null,
): target is MovieDetail => {
  return (target as MovieDetail).title !== undefined;
};

export const isMovie = (target: Movie | TV): target is Movie => {
  return (target as Movie).title !== undefined;
};
