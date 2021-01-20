import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {TV} from '~/@types';
import {tvApi} from '~/api';
import {shuffleArray} from '~/utils/shuffleArray';

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
  async (language: string, {rejectWithValue}) => {
    try {
      const {
        data: {results: airingToday},
      } = await tvApi.airingToday(language);
      const {
        data: {results: upcoming},
      } = await tvApi.upcoming(language);
      const {
        data: {results: popular},
      } = await tvApi.popular(language);
      const {
        data: {results: topRated},
      } = await tvApi.topRated(language);
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
        const {airingToday, upcoming, popular, topRated} = action.payload;
        state.airingToday = shuffleArray(airingToday) as TV[];
        state.upcoming = shuffleArray(upcoming) as TV[];
        state.popular = shuffleArray(popular) as TV[];
        state.topRated = shuffleArray(topRated) as TV[];
        state.loading = false;
      })
      .addCase(fetchTVData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default tvSlice.reducer;
