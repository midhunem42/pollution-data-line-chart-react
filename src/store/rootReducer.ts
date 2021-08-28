import { combineReducers } from "@reduxjs/toolkit";
import global from "./globalReducer";
import { homeReducer } from "../screens/home";

const rootReducer: any = combineReducers({
  global,
  home: homeReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
