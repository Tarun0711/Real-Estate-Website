import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getFilteredPropertiesThunk,
  searchSuggestionsThunk,
} from "./SearchThunk";
import { toast } from "react-toastify";

const initialState = {
  expanded: ["panel1", "panel2", "panel3", "panel4"],
  city: "",
  searchOption: "Buy",
  budgetRange: [0, 200000],
  noOfBedrooms: [],
  propertyType: [],
  area: [0, 4000],
  withPhotos: false,
  isSuggestionsLoading: false,
  suggestions: [],
  properties: [],
  isPropertyLoading: false,
};

export const searchSuggestions = createAsyncThunk(
  "search/searchSuggestions",
  async (city, thunkAPI) => {
    return searchSuggestionsThunk("/Search", city, thunkAPI);
  }
);

export const getFilteredProperties = createAsyncThunk(
  "properties/getFilteredProperties",
  async (filters, ThunkAPI) => {
    return getFilteredPropertiesThunk(
      "/PostForm/details/Filter",
      filters,
      ThunkAPI
    );
  }
);

const SearchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    handleChange: (state, { payload }) => {
      if (state.expanded.includes(payload)) {
        const arr = state.expanded.filter((item) => item !== payload);
        return { ...state, expanded: arr };
      } else {
        return { ...state, expanded: [...state.expanded, payload] };
      }
    },
    handleSearchOption: (state, { payload }) => {
      state.searchOption = payload;
    },
    handleBudgetRange: (state, { payload }) => {
      state.budgetRange = payload;
    },
    handleNoOfBedrooms: (state, { payload }) => {
      if (state.noOfBedrooms.includes(payload)) {
        const arr = state.noOfBedrooms.filter((item) => item !== payload);
        return { ...state, noOfBedrooms: arr };
      } else {
        return { ...state, noOfBedrooms: [...state.noOfBedrooms, payload] };
      }
    },
    handlePropertyType: (state, { payload }) => {
      if (state.propertyType.includes(payload)) {
        const arr = state.propertyType.filter((item) => item !== payload);
        return { ...state, propertyType: arr };
      } else {
        return { ...state, propertyType: [...state.propertyType, payload] };
      }
    },
    handleArea: (state, { payload }) => {
      state.area = payload;
    },
    handleWithPhotos: (state) => {
      state.withPhotos = !state.withPhotos;
    },
    clearSearchState: (state) => initialState,
    handleSearchCity: (state, { payload }) => {
      if (typeof payload === "string") {
        return {
          ...state,
          city: { title: payload },
        };
      } else if (payload && payload.inputValue) {
        return {
          ...state,
          city: { title: payload.inputValue },
        };
      } else {
        return { ...state, city: payload };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchSuggestions.pending, (state) => {
        state.isSuggestionsLoading = true;
      })
      .addCase(searchSuggestions.fulfilled, (state, { payload }) => {
        state.isSuggestionsLoading = false;
        const suggestMap = new Map();
        for (let item of payload) {
          suggestMap.set(item.address, item.address);
          suggestMap.set(item.city, item.city);
          suggestMap.set(item.state, item.state);
        }
        state.suggestions = Array.from(suggestMap.values()).map((address) => ({
          address,
        }));
      })
      .addCase(searchSuggestions.rejected, (state, { payload }) => {
        state.isSuggestionsLoading = false;
        toast.error(payload.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .addCase(getFilteredProperties.pending, (state) => {
        state.isPropertyLoading = true;
      })
      .addCase(getFilteredProperties.fulfilled, (state, { payload }) => {
        state.isPropertyLoading = false;
        state.properties = payload;
      })
      .addCase(getFilteredProperties.rejected, (state, { payload }) => {
        state.isPropertyLoading = false;
        console.log(payload);
      });
  },
});

export const {
  handleSearchOption,
  handleBudgetRange,
  handleNoOfBedrooms,
  handlePropertyType,
  handleArea,
  handleWithPhotos,
  handleChange,
  clearSearchState,
  handleSearchCity,
} = SearchSlice.actions;
export default SearchSlice.reducer;
