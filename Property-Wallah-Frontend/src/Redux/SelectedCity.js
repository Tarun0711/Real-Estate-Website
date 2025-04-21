import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCity: "All Over World", 
};

const selectedCitySlice = createSlice({
  name: "selectedCity",
  initialState,
  reducers: {
    setSelectedCity: (state, action) => {
      state.selectedCity = action.payload; 
    },
    resetSelectedCity: (state) => {
      state.selectedCity = "All Over World"; 
    },
  },
});

// Export actions to be used in components
export const { setSelectedCity, resetSelectedCity } = selectedCitySlice.actions;

// Export the reducer to be used in the store
export default selectedCitySlice.reducer;
