import { put, call } from "redux-saga/effects";
import { fetchUsers } from "../index";
import { getPopularUsersByLanguage } from "../../api";
import { requestUsers, receiveUsers /* , errorUsers */ } from "../../actions";

describe("fetchUsers saga", () => {
  it("should fetch users", () => {
    const language = "javascript";
    const saga = fetchUsers(language);

    expect(saga.next().value).toEqual(put(requestUsers(language)));

    expect(saga.next().value).toEqual(call(getPopularUsersByLanguage, language));

    const data = { data: { items: [] } };

    expect(saga.next(data).value).toEqual(put(receiveUsers(language, data)));

    // or
    expect(saga.next().done).toBeTruthy();

    // or
    // const error = new Error();
    // expect(saga.throw(error).value).toEqual(put(errorUsers(error.message, language)));
  });
});

/*
иногда тест проходит не с первого раза
*/
