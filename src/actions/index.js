import { SELECT_LANGUAGE, REQUEST_USERS, RECEIVE_USERS } from "../constants";
import api from "../api";

export const selectLanguage = (language) => ({
  type: SELECT_LANGUAGE,
  language
});

export const requestUsers = (language) => ({
  type: REQUEST_USERS,
  language
});

export const receiveUsers = (language, data) => ({
  type: RECEIVE_USERS,
  language,
  users: data.data.items,
  receivedAt: Date.now()
});

export const fetchUsers = (language) => (dispatch) => {
  dispatch(requestUsers(language));

  return api
    .getPopularUsersByLanguage(language)
    .then((data) => dispatch(receiveUsers(language, data)));
};

const INVALIDATE_TIME = 60000; // 1 min

// helper
const shouldFetchPosts = (state, language) => {
  const users = state.usersByLanguage[language];

  const timeHasPassed = users && Date.now() - users.receivedAt;

  // загружаем повторно по истечению времени, т.к. сейчас мы кэшируем запросы, но что если данные на сервере обновились? нам нужно подтянуть новые данные, дак вот делаем новый запрос раз в минуту
  if (users && timeHasPassed < INVALIDATE_TIME) {
    return false;
  } else {
    return true;
  }
};

export const fetchUsersIfNeeded = (language) => (dispatch, getState) => {
  // загрузить только если их ещё нет
  if (shouldFetchPosts(getState(), language)) {
    return dispatch(fetchUsers(language));
  }
};
