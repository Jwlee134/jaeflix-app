import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Movie} from '~/@types';
import {movieApi} from '~/api';

interface Payload {
  nowPlaying: Movie[];
  upcoming: Movie[];
  popular: Movie[];
  topRated: Movie[];
}

interface IState extends Payload {
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
  async (_, {rejectWithValue}) => {
    try {
      const {
        data: {results: nowPlaying},
      } = await movieApi.nowPlaying();
      const {
        data: {results: upcoming},
      } = await movieApi.upcoming();
      const {
        data: {results: popular},
      } = await movieApi.popular();
      const {
        data: {results: topRated},
      } = await movieApi.topRated();
      return {nowPlaying, upcoming, popular, topRated};
    } catch (error) {
      console.log(error);
      return rejectWithValue('영화 정보를 불러오는데 오류가 발생했습니다.');
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
        const {
          nowPlaying,
          upcoming,
          popular,
          topRated,
        } = action.payload as Payload;
        state.nowPlaying = nowPlaying;
        state.upcoming = upcoming;
        state.popular = popular;
        state.topRated = topRated;
        state.loading = false;
      })
      .addCase(fetchMovieData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default movieSlice.reducer;
