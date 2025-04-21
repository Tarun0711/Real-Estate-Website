import { configureStore } from "@reduxjs/toolkit";
import SearchSlice from "./SearchBoxSlice";
import SearchModalSlice from "./SearchModalSlice";
import ProfileReducer from './Profile'
import AuthReducer from './Auth'
import CityReducer from './SelectedCity'
import postPropertyReducer from './PostProperty.js'
import formDataReducer from './FormDataSlice.js'
import propertySlice from "./PropertySlice.js";

export const store = configureStore({
  reducer: {
    search: SearchSlice,
    searchModal: SearchModalSlice,
    profile:ProfileReducer,
    auth:AuthReducer,
    selectedCity: CityReducer,
    postProperty: postPropertyReducer,
    formData: formDataReducer,
    properties: propertySlice,
  },
});
