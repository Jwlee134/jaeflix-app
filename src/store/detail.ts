import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Cast, Crew, MovieDetail, TVDetail} from '~/@types';
import {movieApi, tvApi} from '~/api';

interface Payload {
  detail: (MovieDetail | TVDetail) | null;
  cast: Cast[];
  crew: Crew[];
}

interface IState {
  detail: (MovieDetail | TVDetail) | null;
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
      return rejectWithValue('상세 정보를 불러오는 데 오류가 발생했습니다.');
    }
  },
);

export const fetchTVDetail = createAsyncThunk(
  'detail/fetchTVDetail',
  async (id: number, {rejectWithValue}) => {
    try {
      const {data: detail} = await tvApi.detail(id);
      const {
        data: {cast, crew},
      } = await tvApi.credits(id);
      return {detail, cast, crew};
    } catch (error) {
      console.log(error);
      return rejectWithValue('상세 정보를 불러오는 데 오류가 발생했습니다.');
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
      })
      .addCase(fetchTVDetail.pending, (state) => {
        state.detail = null;
        state.cast = [];
        state.crew = [];
        state.loading = true;
      })
      .addCase(fetchTVDetail.fulfilled, (state, action) => {
        const {detail, cast, crew} = action.payload as Payload;
        state.detail = detail;
        state.cast = cast;
        state.crew = crew;
        state.loading = false;
      })
      .addCase(fetchTVDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default detailSlice.reducer;
