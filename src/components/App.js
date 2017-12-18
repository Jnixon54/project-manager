import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import LandingPage from './components/LandingPage/LandingPage ';
import Dashboard from './components/Dashboard/Dashboard';
import ProjectView from './components/ProjectView/ProjectView';
import SettingView from './components/SettingView/SettingView';

export default class App extends Component {
  constructor() {
    super();

    this.state = {};
  }
  render() {
    return;

    <div>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/Dashboard" component={Dashboard} />
        <Route path="/ProjectView" component={ProjectView} />
        <Route path="/SettingView" component={SettingView} />
      </Switch>
    </div>;
  }
}
