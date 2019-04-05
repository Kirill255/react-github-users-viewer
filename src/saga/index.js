import { put, call, fork, select, /* takeLatest, */ take } from "redux-saga/effects";

import { getPopularUsersByLanguage } from "../api";
import { requestUsers, receiveUsers, errorUsers } from "../actions";
import { getSelectedLanguage, getUsersByLanguage } from "../selectors";

import { SELECT_LANGUAGE, REFRESH_USERS } from "../constants";

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

export function* refreshUsers() {
  while (true) {
    yield take(REFRESH_USERS);

    const language = yield select(getSelectedLanguage);

    yield fork(fetchUsers, language);
  }
}

// helper
const INVALIDATE_TIME = 60000; // 1 min
const shouldFetcUsers = (users) => {
  // users - это объект, чтобы проверить пустой объект или нет используем Object.keys(users).length, в нашем случае объект не должен быть пустым(тоесть есть данные) и время вышло
  if (Object.keys(users).length && Date.now() - users.receivedAt < INVALIDATE_TIME) {
    return false;
  } else {
    return true;
  }
};

export function* watchSelectLanguage() {
  while (true) {
    yield take(SELECT_LANGUAGE);

    const usersByLanguage = yield select(getUsersByLanguage);
    const language = yield select(getSelectedLanguage);

    if (!usersByLanguage.items) {
      yield fork(fetchUsers, language);
    }

    if (shouldFetcUsers(usersByLanguage)) {
      yield fork(fetchUsers, language);
    }
  }
}

export function* startup() {
  const selectedLanguage = yield select(getSelectedLanguage);

  yield fork(fetchUsers, selectedLanguage);
}

export default function* rootSaga() {
  yield fork(startup);
  yield fork(watchSelectLanguage);
  yield fork(refreshUsers);
}
