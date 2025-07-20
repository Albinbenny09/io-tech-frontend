
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 'en',
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    toggleLanguage: (state) => {
      state.value = state.value === 'en' ? 'ar' : 'en';
    },
  },
});

export const { toggleLanguage } = languageSlice.actions;
export const selectLanguage = (state) => state.language.value;
export default languageSlice.reducer;
