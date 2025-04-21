import { createSlice } from "@reduxjs/toolkit";

const postProperty = createSlice({
  name: "postProperty",
  initialState: {
    step: 1,
    isFinished: false,
    formData: {} // Add formData to initialState
  },
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload;
    },
    incrementStep: (state) => {
      state.step += 1;
    },
    resetPostState: (state) => {
      state.step = 1;
    },
    saveFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    uploadPhotos: (state, action) => {
      return { ...state, photos: action.payload };
    },
  },
});

export const {
  setStep,
  incrementStep,
  saveFormData,
  uploadPhotos
} = postProperty.actions;

export default postProperty.reducer;