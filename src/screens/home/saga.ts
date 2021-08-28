import { call, put, takeLatest } from "redux-saga/effects";
import {
  getCitiesAction,
  getCountriesAction,
  getPollutionDataAction,
  setCitiesAction,
  setCountriesAction,
  setLoading,
  setMeasurementsAction,
} from "./reducer";

import API from "../../api/API";
import { ApiConstants } from "../../api/ApiConstants";

interface IPaginatedResponse {
  meta: {
    name: string;
    license: string;
    website: string;

    page: number;
    limit: number;
    found: number;
  };
  results: [];
}

function* getPollutionDataSaga(action: any) {
  try {
    const response: IPaginatedResponse = yield call(
      API,
      ApiConstants.GET_POLLUTION_DATA + action.payload,
      null,
      "GET"
    );
    yield put(setMeasurementsAction(response.results || []));
    yield put(setLoading(false));
  } catch (error) {
    yield put(setLoading(false));
  }
}

function* getCountriesSaga(action: any) {
  try {
    const response: IPaginatedResponse = yield call(
      API,
      ApiConstants.GET_COUNTRY,
      null,
      "GET"
    );
    yield put(setCitiesAction([]));
    yield put(setCountriesAction(response.results || []));
    yield put(setLoading(false));
  } catch (error) {
    yield put(setLoading(false));
  }
}

function* getCitiesSaga(action: any) {
  try {
    const response: IPaginatedResponse = yield call(
      API,
      ApiConstants.GET_CITIES + action.payload,
      null,
      "GET"
    );
    yield put(setCitiesAction(response.results || []));
    yield put(setLoading(false));
  } catch (error) {
    yield put(setLoading(false));
  }
}

export function* homeSaga() {
  yield takeLatest(getPollutionDataAction.type, getPollutionDataSaga);
  yield takeLatest(getCountriesAction.type, getCountriesSaga);
  yield takeLatest(getCitiesAction.type, getCitiesSaga);
}
