import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Movie} from '~/@types';
import {movieApi} from '~/api';
import {shuffleArray} from '~/utils/shuffleArray';

interface IState {
  nowPlaying: Movie[];
  upcoming: Movie[];
  popular: Movie[];
  topRated: Movie[];
  loading: boolean;
  error: string | null;
}

const initialState: IState = {
  nowPlaying: [],
  upcoming: [],
  popular: [],
  topRated: [],
  loading: true,
  error: null,
};

export const fetchMovieData = createAsyncThunk(
  'movie/fetchMovie',
  async (language: string, {rejectWithValue}) => {
    try {
      const {
        data: {results: nowPlaying},
      } = await movieApi.nowPlaying(language);
      const {
        data: {results: upcoming},
      } = await movieApi.upcoming(language);
      const {
        data: {results: popular},
      } = await movieApi.popular(language);
      const {
        data: {results: topRated},
      } = await movieApi.topRated(language);
      return {nowPlaying, upcoming, popular, topRated};
    } catch (error) {
      console.log(error);
      return rejectWithValue('영화 정보를 불러오는 데 오류가 발생했습니다.');
    }
  },
);

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieData.fulfilled, (state, action) => {
        const {nowPlaying, upcoming, popular, topRated} = action.payload;
        state.nowPlaying = shuffleArray(nowPlaying) as Movie[];
        state.upcoming = shuffleArray(upcoming) as Movie[];
        state.popular = shuffleArray(popular) as Movie[];
        state.topRated = shuffleArray(topRated) as Movie[];
        state.loading = false;
      })
      .addCase(fetchMovieData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default movieSlice.reducer;
