/* import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Cast, Crew, MovieDetail, TVDetail, Movie, TV} from '~/@types';
import {movieApi, tvApi} from '~/api';

interface IState {
  detail: MovieDetail | TVDetail | null;
  cast: Cast[];
  crew: Crew[];
  loading: boolean;
  error: string | null;
  similar: Movie[] | TV[];
}

const initialState: IState = {
  detail: null,
  cast: [],
  crew: [],
  loading: false,
  error: null,
  similar: [],
};

export const fetchMovieDetail = createAsyncThunk(
  'detail/fetchMovieDetail',
  async (id: number, {rejectWithValue}) => {
    try {
      const {data: detail} = await movieApi.detail(id);
      const {
        data: {cast, crew},
      } = await movieApi.credits(id);
      const {
        data: {results: similar},
      } = await movieApi.similar(id);
      return {detail, cast, crew, similar};
    } catch (error) {
      console.log(error);
      return rejectWithValue('상세 정보를 불러오는 데 오류가 발생했습니다.');
    }
  },
);

export const fetchSearchMovieDetail = createAsyncThunk(
  'detail/fetchSearchMovieDetail',
  async (id: number, {rejectWithValue}) => {
    try {
      const {data: detail} = await movieApi.detail(id);
      const {
        data: {cast, crew},
      } = await movieApi.credits(id);
      const {
        data: {results: similar},
      } = await movieApi.similar(id);
      return {detail, cast, crew, similar};
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
      const {
        data: {results: similar},
      } = await tvApi.similar(id);
      return {detail, cast, crew, similar};
    } catch (error) {
      console.log(error);
      return rejectWithValue('상세 정보를 불러오는 데 오류가 발생했습니다.');
    }
  },
);

export const fetchSearchTVDetail = createAsyncThunk(
  'detail/fetchSearchTVDetail',
  async (id: number, {rejectWithValue}) => {
    try {
      const {data: detail} = await tvApi.detail(id);
      const {
        data: {cast, crew},
      } = await tvApi.credits(id);
      const {
        data: {results: similar},
      } = await tvApi.similar(id);
      return {detail, cast, crew, similar};
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
        state.loading = true;
      })
      .addCase(fetchMovieDetail.fulfilled, (state, action) => {
        const {detail, cast, crew, similar} = action.payload;
        state.detail = detail;
        state.cast = cast;
        state.crew = crew;
        state.similar = similar;
        state.loading = false;
      })
      .addCase(fetchMovieDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchTVDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTVDetail.fulfilled, (state, action) => {
        const {detail, cast, crew, similar} = action.payload;
        state.detail = detail;
        state.cast = cast;
        state.crew = crew;
        state.similar = similar;
        state.loading = false;
      })
      .addCase(fetchTVDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchSearchMovieDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSearchMovieDetail.fulfilled, (state, action) => {
        const {detail, cast, crew, similar} = action.payload;
        state.detail = detail;
        state.cast = cast;
        state.crew = crew;
        state.similar = similar;
        state.loading = false;
      })
      .addCase(fetchSearchMovieDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchSearchTVDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSearchTVDetail.fulfilled, (state, action) => {
        const {detail, cast, crew, similar} = action.payload;
        state.detail = detail;
        state.cast = cast;
        state.crew = crew;
        state.similar = similar;
        state.loading = false;
      })
      .addCase(fetchSearchTVDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default detailSlice.reducer; */
