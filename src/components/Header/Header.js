import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import LoginModal from '../LandingPage/LoginModal/LoginModal';

import HeaderMenu from './HeaderMenu/HeaderMenu';

import './Header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
      modalOpen: false
    };
    this.openMenu = this.openMenu.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  openMenu() {
    this.setState({ menuOpen: !this.state.menuOpen });
  }

  toggleModal() {
    this.setState({ modalOpen: !this.state.modalOpen });
  }

  render() {
    
    const loginModal = this.state.modalOpen ? <LoginModal/> : null;
    return (
      <div>
        <header className="container" id="HeaderBar">
          <div style={{'width': '60px'}}></div>
          <div className="logo-text">
            Group<span>i</span><span>i</span>
          </div>
          <HeaderMenu toggleModal={this.toggleModal}
                      modalOpen={this.state.modalOpen}/>
          {this.state.menuOpen === true && (
            <menu id="menuDropdown">
              <Link to="/Dashboard">
                <h3>Projects</h3>
              </Link>
              <Link to="/SettingView">
                <h3>Settings</h3>
              </Link>
              <h3>Logout</h3>
            </menu>
          )}
        </header>
        {loginModal}
      </div>
    );
  }
}

export default Header;

//early Header, No functionality or hamburger yet. Not to be used on the landing Page
