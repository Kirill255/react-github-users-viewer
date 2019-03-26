import React, { Component } from "react";
import User from "./User.js";

import "./UserList.css";

export default class UserList extends Component {
  render() {
    const { users } = this.props;

    return (
      <div className="user-list">
        {users.map((user) => (
          <User key={user.login} name={user.login} avatar={user.avatar_url} link={user.url} />
        ))}
      </div>
    );
  }
}
