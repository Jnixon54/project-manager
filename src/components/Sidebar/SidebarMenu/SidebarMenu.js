import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LoginModal from '../../LandingPage/LoginModal/LoginModal';

import './SidebarMenu.css';

const Login = (props) => (
  <div className="sidebar-burger" onClick={props.toggleModal}>
    <div className={"burger-bar ".concat(props.modalOpen ? "is-active" : '')} id="bar-1"></div>
    <div className={"burger-bar ".concat(props.modalOpen ? "is-active" : '')} id="bar-2"></div>
    <div className={"burger-bar ".concat(props.modalOpen ? "is-active" : '')} id="bar-3"></div>
  </div>
)

const Settings = (props) => (
  <div className="sidebar-burger" onClick={props.toggleMenu}>
    <div className={"burger-bar menu ".concat(props.settingsOpen ? "is-active" : '')} id="bar-1"></div>
    <div className={"burger-bar menu ".concat(props.settingsOpen ? "is-active" : '')} id="bar-2"></div>
    <div className={"burger-bar menu ".concat(props.settingsOpen ? "is-active" : '')} id="bar-3"></div>
  </div>
)

const CheckMark = (props) => (
  <div className="sidebar-check" onClick={props.toggleTaskList}>
    <div className={"check-bar ".concat(props.taskListOpen ? "is-active" : '')} id="check-bar-1"></div>
    <div className={"check-bar ".concat(props.taskListOpen ? "is-active" : '')} id="check-bar-2"></div>
  </div>
)

const SidebarMenu = (props) => {
  return (
    <Switch>
      <Route exact path="/" render={() => (<Login toggleModal={props.toggleModal}
                                                  modalOpen={props.modalOpen}/>)} />
      <Route path="/" render={() => (
        <div>
          <Settings toggleMenu={props.toggleMenu}
                   settingsOpen={props.settingsOpen}/>
          <CheckMark toggleTaskList={props.toggleTaskList}
                   taskListOpen={props.taskListOpen}/>
        </div>
                                                 )} />
    </Switch>
  )
}

export default SidebarMenu