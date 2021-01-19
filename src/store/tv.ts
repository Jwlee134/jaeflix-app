import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {TV} from '~/@types';
import {tvApi} from '~/api';

interface Payload {
  airingToday: TV[];
  upcoming: TV[];
  popular: TV[];
  topRated: TV[];
}

interface IState {
  airingToday: TV[];
  popular: TV[];
  topRated: TV[];
  upcoming: TV[];
  loading: boolean;
  error: string | null;
}

const initialState: IState = {
  airingToday: [],
  popular: [],
  topRated: [],
  upcoming: [],
  loading: true,
  error: null,
};

export const fetchTVData = createAsyncThunk(
  'tv/fetchTV',
  async (_, {rejectWithValue}) => {
    try {
      const {
        data: {results: airingToday},
      } = await tvApi.airingToday();
      const {
        data: {results: upcoming},
      } = await tvApi.upcoming();
      const {
        data: {results: popular},
      } = await tvApi.popular();
      const {
        data: {results: topRated},
      } = await tvApi.topRated();
      return {airingToday, upcoming, popular, topRated};
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        'TV 프로그램 정보를 불러오는 데 오류가 발생했습니다.',
      );
    }
  },
);

const tvSlice = createSlice({
  name: 'tv',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTVData.fulfilled, (state, action) => {
        const {
          airingToday,
          upcoming,
          popular,
          topRated,
        } = action.payload as Payload;
        state.airingToday = airingToday;
        state.upcoming = upcoming;
        state.popular = popular;
        state.topRated = topRated;
        state.loading = false;
      })
      .addCase(fetchTVData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default tvSlice.reducer;