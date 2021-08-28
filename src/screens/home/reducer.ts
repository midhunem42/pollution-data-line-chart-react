import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  loading: false,
  error: null,
  countries: [],
  measurements: [],
  cities: [],
};
export const slice = createSlice({
  name: "home",
  initialState,
  reducers: {
    getPollutionDataAction: (state, action) => {
      return { ...state, loading: true };
    },
    getCountriesAction: (state) => {
      return { ...state, loading: true };
    },
    setCountriesAction: (state, action) => {
      return { ...state, countries: action.payload };
    },
    setMeasurementsAction: (state, action) => {
      return { ...state, measurements: action.payload };
    },
    getCitiesAction: (state, action) => {
      return { ...state, loading: true };
    },
    setCitiesAction: (state, action) => {
      return { ...state, cities: action.payload };
    },
    setLoading: (state, action) => {
      return { ...state, loading: action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  getCitiesAction,
  getCountriesAction,
  getPollutionDataAction,
  setCitiesAction,
  setCountriesAction,
  setLoading,
  setMeasurementsAction,
} = slice.actions;
export default slice.reducer;
