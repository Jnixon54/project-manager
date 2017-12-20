import React, { Component } from 'react';
import '../SettingView.css';

// import Header from '../../Header/Header';

// import { Link } from 'react-router-dom';

export default class Settings extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <br />
        <div className="settings">
          <h3>Account Details</h3>
          <li>Change Name, initial, or Bio...</li>
          <li>Change Avatar</li>
          <li>Change Email</li>
          <li>Change Password</li>
          <li>Change Language</li>
        </div>
      </div>
    );
  }
}
