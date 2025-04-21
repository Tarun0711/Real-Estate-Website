import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllProperties } from '../Services/Operations/PropertyServices';

export const fetchAllProperties = createAsyncThunk(
  'properties/fetchAll',
  async (_, { getState, rejectWithValue }) => {
    
    try {
      const response = await getAllProperties();

      console.log("joasd",response);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  } 
);

const propertySlice = createSlice({
  name: 'properties',
  initialState: {
    properties: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = action.payload.data; // Ensure correct data structure
      })
      .addCase(fetchAllProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default propertySlice.reducer;
