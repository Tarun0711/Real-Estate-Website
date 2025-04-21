
import { createSlice } from "@reduxjs/toolkit";

const fileUploadSlice = createSlice({
  name: "fileUpload",
  initialState: {
    files: [],
  },
  reducers: {
    setFiles: (state, action) => {
      state.files = action.payload;
    },
    clearFiles: (state) => {
      state.files = [];
    },
  },
});

export const { setFiles, clearFiles } = fileUploadSlice.actions;
export default fileUploadSlice.reducer;