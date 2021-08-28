import { call, delay, put, select, takeLatest } from "redux-saga/effects";
import {
  getUsername,
  globalReducer,
  setUsername,
  setValidFields,
  validateFields,
} from "./globalReducer";

import { globalSelector } from "./globalSelector";

export default function* appointmentSaga() {}
