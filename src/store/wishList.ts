import {createSlice} from '@reduxjs/toolkit';
import {Movie, TV} from '~/@types';

interface IState {
  movieList: Movie[];
  tvList: TV[];
}

const initialState: IState = {
  movieList: [],
  tvList: [],
};

const wishListSlice = createSlice({
  name: 'waitList',
  initialState,
  reducers: {
    addMovie: (state, action) => {
      state.movieList.push(action.payload);
    },
    removeMovie: (state, action) => {
      state.movieList = state.movieList.filter(
        (item) => item.id !== action.payload,
      );
    },
    addTV: (state, action) => {
      state.tvList.push(action.payload);
    },
    removeTV: (state, action) => {
      state.tvList = state.tvList.filter((item) => item.id !== action.payload);
    },
    refreshMovieList: (state) => {
      state.movieList = [];
    },
    refreshTVList: (state) => {
      state.tvList = [];
    },
  },
});

export const {
  addMovie,
  removeMovie,
  addTV,
  removeTV,
  refreshMovieList,
  refreshTVList,
} = wishListSlice.actions;

export default wishListSlice.reducer;
