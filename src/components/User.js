import React, { Component } from "react";

import "./User.css";

export default class User extends Component {
  render() {
    const { link, name, avatar } = this.props;

    return (
      <a href={link} className="user" target="_blank" rel="noopener noreferrer">
        <img className="user__avatar" src={avatar} alt="" />
        <div className="user__info">
          <div className="user__name"> {name} </div>
        </div>
      </a>
    );
  }
}
