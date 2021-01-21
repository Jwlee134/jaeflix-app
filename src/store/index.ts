import {combineReducers, configureStore} from '@reduxjs/toolkit';

import movie from './movie';
// import detail from './detail';
import tv from './tv';
import search from './search';
import language from './language';
import wishList from './wishList';

import {useDispatch} from 'react-redux';

const rootReducer = combineReducers({
  movie,
  // detail,
  tv,
  search,
  language,
  wishList,
});

const store = configureStore({reducer: rootReducer});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
