import { put, call, fork, select, takeLatest } from "redux-saga/effects";

import { getPopularUsersByLanguage } from "../api";
import { requestUsers, receiveUsers, errorUsers } from "../actions";
import { getSelectedLanguage } from "../selectors";

import { SELECT_LANGUAGE } from "../constants";

export function* fetchUsers(language) {
  yield put(requestUsers(language));

  try {
    const data = yield call(getPopularUsersByLanguage, language);
    yield put(receiveUsers(language, data));
  } catch (error) {
    // yield put(errorUsers(error, language));
    if (error.response) {
      yield put(errorUsers(error.response.data.message, language));
    } else {
      yield put(errorUsers(error.message, language));
    }
  }
}

export function* selectLanguage(action) {
  // console.log(action);
  yield fork(fetchUsers, action.language);
}

export function* watchSelectLanguage() {
  yield takeLatest(SELECT_LANGUAGE, selectLanguage);
}

export function* startup() {
  const selectedLanguage = yield select(getSelectedLanguage);

  yield fork(fetchUsers, selectedLanguage);
}

export default function* rootSaga() {
  yield fork(startup);
  yield fork(watchSelectLanguage);
}
