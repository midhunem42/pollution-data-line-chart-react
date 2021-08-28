import { all, fork } from "redux-saga/effects";

import globalSaga from "./globalSaga";
import { homeSaga } from "../screens/home";

export default function* rootSaga() {
  yield all([fork(globalSaga), fork(homeSaga)]);
}
