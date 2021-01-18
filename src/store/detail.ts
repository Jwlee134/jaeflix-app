import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Cast, Crew, MovieDetail} from '~/@types';
import {movieApi} from '~/api';

interface Payload {
  detail: MovieDetail | null;
  cast: Cast[];
  crew: Crew[];
}

interface IState {
  detail: MovieDetail | null;
  cast: Cast[];
  crew: Crew[];
  loading: boolean;
  error: string | null;
}

const initialState: IState = {
  detail: null,
  cast: [],
  crew: [],
  loading: false,
  error: null,
};

export const fetchMovieDetail = createAsyncThunk(
  'detail/fetchMovieDetail',
  async (id: number, {rejectWithValue}) => {
    try {
      const {data: detail} = await movieApi.detail(id);
      const {
        data: {cast, crew},
      } = await movieApi.credits(id);
      return {detail, cast, crew};
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        '영화 상세 정보를 불러오는데 오류가 발생했습니다.',
      );
    }
  },
);

const detailSlice = createSlice({
  name: 'detail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieDetail.pending, (state) => {
        state.detail = null;
        state.cast = [];
        state.crew = [];
        state.loading = true;
      })
      .addCase(fetchMovieDetail.fulfilled, (state, action) => {
        const {detail, cast, crew} = action.payload as Payload;
        state.detail = detail;
        state.cast = cast;
        state.crew = crew;
        state.loading = false;
      })
      .addCase(fetchMovieDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default detailSlice.reducer;
