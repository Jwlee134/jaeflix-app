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

interface Props {
  page: number;
  value: string;
}

export const fetchMovieData = createAsyncThunk(
  'movie/fetchMovie',
  async ({page, value}: Props, {rejectWithValue}) => {
    try {
      const {
        data: {results: nowPlaying},
      } = await movieApi.nowPlaying(page, value);
      const {
        data: {results: upcoming},
      } = await movieApi.upcoming(page, value);
      const {
        data: {results: popular},
      } = await movieApi.popular(page, value);
      const {
        data: {results: topRated},
      } = await movieApi.topRated(page, value);
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
