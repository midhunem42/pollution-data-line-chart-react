import { createSlice } from "@reduxjs/toolkit";

export interface globalReducer {
  userId: string | null;
  token: string | null;
  role: string;
  validFields: any;
  username: any;
}

const initialState: globalReducer = {
  role: "PUBLIC",
  token: null,
  userId: null,
  username: null,
  validFields: {},
};
export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      return { ...state, userId: action.payload };
    },
    setRole: (state, action) => {
      return { ...state, role: action.payload };
    },
    setValidFields: (state, action) => {
      return { ...state, validFields: action.payload };
    },
    validateFields: (state, action) => {
      return { ...state };
    },
    setToken: (state, action) => {
      return { ...state, token: action.payload };
    },
    getUsername: (state) => {
      return { ...state };
    },
    setUsername: (state, action) => {
      return { ...state, username: action.payload };
    },
    logoutUser: (state) => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  getUsername,
  logoutUser,
  setRole,
  setToken,
  setUserId,
  setUsername,
  setValidFields,
  validateFields,
} = globalSlice.actions;
export default globalSlice.reducer;
