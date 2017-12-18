import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import LandingPage from './LandingPage/LandingPage';
import Dashboard from './Dashboard/Dashboard';
import ProjectView from './ProjectView/ProjectView';
import SettingView from './SettingView/SettingView';

export default class App extends Component {
  constructor() {
    super();
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
