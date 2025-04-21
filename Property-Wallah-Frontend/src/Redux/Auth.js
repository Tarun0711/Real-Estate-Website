import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signupData: null,
  loading: false,
  token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null, 
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setSignupData(state, action) {
      state.signupData = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    settoken(state, action) {  
      state.token = action.payload; 
    },
  },
});

export const { setSignupData, setLoading, settoken } = authSlice.actions; 

export const selectIsAuthenticated = (state) => !!state.auth.token;

export default authSlice.reducer;
