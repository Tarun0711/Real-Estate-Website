import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pwUser: localStorage.getItem("pwUser") ? JSON.parse(localStorage.getItem("pwUser")) : null,
  loading: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    setPwUser(state, action) {
      state.pwUser = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { setPwUser, setLoading } = profileSlice.actions;
export default profileSlice.reducer;
