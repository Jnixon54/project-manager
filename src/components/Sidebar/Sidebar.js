import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import LoginModal from '../LandingPage/LoginModal/LoginModal';

import SidebarMenu from './SidebarMenu/SidebarMenu';

import './Sidebar.css';

class Sidebar extends Component {
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
      <div className="sidebar" id={this.props.id}>
          <div style={{'width': '60px'}}></div>
          <div className="logo-text">
            Group<span>i</span><span>i</span>
          </div>
          <SidebarMenu toggleModal={this.toggleModal}
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
        {loginModal}
      </div>
    );
  }
}

export default Sidebar;

//early Sidebar, No functionality or hamburger yet. Not to be used on the landing Page
