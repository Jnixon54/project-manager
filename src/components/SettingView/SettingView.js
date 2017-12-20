import React, { Component } from 'react';
import './SettingView.css';
import { Link } from 'react-router-dom';

import Header from '../Header/Header';

// import Cards from './Cards/Cards';
// import Profile from './Profile/Profile';
// import Settings from './Profile/Profile';

export default class SettingView extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Header />
        <br />
        <br />
        <div>
          <Link className="links" to="/SettingView/Cards">
            Cards
          </Link>
          <Link className="links" to="/SettingView/Profile">
            Profile
          </Link>
          <Link className="links" to="/SettingView/Settings">
            Settings
          </Link>
        </div>
        {this.props.children}
      </div>
    );
  }
}
