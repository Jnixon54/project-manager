import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false
    };
    this.openMenu = this.openMenu.bind(this);
  }

  openMenu() {
    this.setState({ menuOpen: !this.state.menuOpen });
  }

  render() {
    return (
      <header id="HeaderBar">
        <div className="headerComponents">
          <img
            className="logo"
            src="https://i.pinimg.com/236x/05/00/c8/0500c8d129dabb81af2ea998558c8cc0.jpg"
            alt=""
          />
          <img
            onClick={this.openMenu}
            className="userImg"
            src="https://www.communitylandtrust.ca/wp-content/uploads/2015/10/placeholder.png"
            alt=""
          />
        </div>
        {this.state.menuOpen === true && (
          <menu id="menuDropdown">
            <Link to="/Dashboard">
              <h3>Dashboard</h3>
            </Link>
            <Link to="/ProjectView">
              <h3>Projects</h3>
            </Link>
            <Link to="/SettingView">
              <h3>Settings</h3>
            </Link>
            <h3>Logout</h3>
          </menu>
        )}
      </header>
    );
  }
}

export default Header;

//early Header, No functionality or hamburger yet. Not to be used on the landing Page
