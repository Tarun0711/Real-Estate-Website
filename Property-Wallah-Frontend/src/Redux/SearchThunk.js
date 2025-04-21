import customFetch from "../utils/axios";

export const searchSuggestionsThunk = async (url, searchTerm, thunkAPI) => {
  try {
    const resp = await customFetch.get(`${url}?searchTerm=${searchTerm}`);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const getFilteredPropertiesThunk = async (url, filters, ThunkAPI) => {
  const newUrl = `${url}?minPrice=${filters.minPrice}&maxPrice=${
    filters.maxPrice
  }&minArea=${filters.minArea}&maxArea=${filters.maxArea}&City=${
    filters.City.address === undefined ? "" : filters.City.address
  }`;
  try {
    const resp = await customFetch.get(newUrl);
    return resp.data;
  } catch (error) {
    return ThunkAPI.rejectWithValue(error.response.data.msg);
  }
};
