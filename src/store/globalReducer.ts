import { createSlice } from "@reduxjs/toolkit";

export interface globalReducer {
  token: string | null;
  role: string;
}

const initialState: globalReducer = {
  role: "PUBLIC",
  token: null,
};
export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setRole: (state, action) => {
      return { ...state, role: action.payload };
    },
    setToken: (state, action) => {
      return { ...state, token: action.payload };
    },
    logoutUser: (state) => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  logoutUser,
  setRole,
  setToken,
} = globalSlice.actions;
export default globalSlice.reducer;
