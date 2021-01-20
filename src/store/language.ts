import {createSlice} from '@reduxjs/toolkit';

interface IState {
  value: string;
}

const initialState: IState = {
  value: 'ko-KR',
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const {setLanguage} = languageSlice.actions;

export default languageSlice.reducer;
