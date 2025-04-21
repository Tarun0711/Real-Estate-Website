import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
};

const SearchModalSlice = createSlice({
  name: "searchModal",
  initialState,
  reducers: {
    openSearchModal: (state) => { 
      state.open = true;
    },
    closeSearchModal: (state) => {
      state.open = false;
    },
  },
});

export default SearchModalSlice.reducer;
export const { openSearchModal, closeSearchModal } = SearchModalSlice.actions;
