import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Movie, TV} from '~/@types';
import {movieApi, tvApi} from '~/api';

interface IState {
  movie: Movie[] | null;
  tv: TV[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: IState = {
  movie: null,
  tv: null,
  loading: false,
  error: null,
};

interface Props {
  term: string;
  value: string;
}

export const fetchResults = createAsyncThunk(
  'search/fetchResults',
  async ({term, value}: Props, {rejectWithValue}) => {
    try {
      const {
        data: {results: movie},
      } = await movieApi.search(term, value);
      const {
        data: {results: tv},
      } = await tvApi.search(term, value);
      return {movie, tv};
    } catch (error) {
      console.log(error);
      return rejectWithValue('검색하는 도중에 에러가 발생했습니다.');
    }
  },
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchResults.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchResults.fulfilled, (state, action) => {
        const {movie, tv} = action.payload;
        state.movie = movie;
        state.tv = tv;
        state.loading = false;
      })
      .addCase(fetchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default searchSlice.reducer;
