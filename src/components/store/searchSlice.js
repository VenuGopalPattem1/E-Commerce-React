import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  results: [],
  isLoading: false,
  error: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    startSearch: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setSearchResults: (state, action) => {
      state.isLoading = false;
      state.results = action.payload;
    },
    setSearchError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    clearSearchResults: (state) => {
      state.results = [];
    },
  },
});

export const {
  startSearch,
  setSearchResults,
  setSearchError,
  clearSearchResults,
} = searchSlice.actions;

export default searchSlice.reducer;
