import React, { Component } from "react";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import Picker from "../components/Picker";
import UserList from "../components/UserList";

import { selectLanguage, refreshUsers } from "../actions";
import { getSelectedLanguage, isUsersFetching, getUsersItems, getUsersError } from "../selectors";

import "./App.css";

const LANGUAGES = [
  "javascript",
  "java",
  "python",
  "css",
  "php",
  "c++",
  "c#",
  "c",
  "shell",
  "objective-c",
  "go",
  "perl"
];

class App extends Component {
  render() {
    const { users, selectedLanguage, isFetching, error, selectLanguage, refreshUsers } = this.props;

    if (error) {
      return (
        <div className="app">
          <div className="app__error">{error}</div>
        </div>
      );
    }

    return (
      <div className="app">
        <Picker value={selectedLanguage} options={LANGUAGES} onChange={selectLanguage} />

        <div className="app__content">
          {isFetching ? (
            <Loader type="CradleLoader" color="#00BFFF" height="100" width="100" />
          ) : (
            <div>
              <button onClick={refreshUsers}>Refresh</button>
              <UserList users={users} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => {
    console.log(state);

    return {
      users: getUsersItems(state),
      isFetching: isUsersFetching(state),
      error: getUsersError(state),
      selectedLanguage: getSelectedLanguage(state)
    };
  },
  { selectLanguage, refreshUsers }
)(App);
