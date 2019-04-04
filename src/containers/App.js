import React, { Component } from "react";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import Picker from "../components/Picker";
import UserList from "../components/UserList";

import { fetchUsersIfNeeded, selectLanguage } from "../actions";
import { getUsersByLanguage } from "../selectors";

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
  componentDidMount() {
    this.props.fetchUsersIfNeeded(this.props.selectedLanguage);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedLanguage !== this.props.selectedLanguage) {
      this.props.fetchUsersIfNeeded(nextProps.selectedLanguage);
    }
  }

  render() {
    const { users, selectedLanguage, isFetching, error, selectLanguage } = this.props;

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
            <UserList users={users} />
          )}
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => {
    console.log(state);
    const users = getUsersByLanguage(state);

    return {
      users: users.items || [],
      isFetching: users.isFetching,
      selectedLanguage: state.language,
      error: users.error
    };
  },
  { selectLanguage, fetchUsersIfNeeded }
)(App);
