import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import LoginModal from '../LandingPage/LoginModal/LoginModal';

import SidebarMenu from './SidebarMenu/SidebarMenu';
import TaskMenu from './Menu/TaskMenu/TaskMenu';
import SettingsMenu from './Menu/SettingsMenu/SettingsMenu';

import './Sidebar.css';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settingsOpen: false,
      modalOpen: false,
      taskListOpen: false
    };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleTaskList = this.toggleTaskList.bind(this);
  }

  toggleMenu() {
    this.setState({ settingsOpen: !this.state.settingsOpen });
    console.log(this.state.settingsOpen)
  }

  toggleModal() {
    this.setState({ modalOpen: !this.state.modalOpen });
  }

  toggleTaskList() {
    this.setState({ taskListOpen: !this.state.taskListOpen });
  }

  render() {
    const loginModal = this.state.modalOpen ? <LoginModal/> : null;
    const settingsMenu = this.state.settingsOpen ? <SettingsMenu /> : null;
    const taskList = this.state.taskListOpen ? <TaskMenu /> : null;
    const logo = this.props.showLogo ? 
      <div className="logo-container">
        <div className="logo-text">
          Group<span>i</span><span>i</span>
        </div>
      </div> : null;
    return (
      <div className="sidebar" id={this.props.id}>
          {/* <div style={{'width': '60px'}}></div> */}
          {logo}
          <SidebarMenu toggleModal={this.toggleModal}
                      modalOpen={this.state.modalOpen}
                      toggleMenu={this.toggleMenu}
                      settingsOpen={this.state.settingsOpen}
                      toggleTaskList={this.toggleTaskList}
                      taskListOpen={this.state.taskListOpen}/>
          
          {/* {this.state.menuOpen === true && (
            <menu id="menuDropdown">
              <Link to="/Dashboard">
                <h3>Projects</h3>
              </Link>
              <Link to="/SettingView">
                <h3>Settings</h3>
              </Link>
              <h3>Logout</h3>
            </menu>
          )} */}
        {loginModal}
        {settingsMenu}
        {taskList}
      </div>
    );
  }
}

export default Sidebar;

//early Sidebar, No functionality or hamburger yet. Not to be used on the landing Page
