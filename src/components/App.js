import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import LandingPage from './LandingPage/LandingPage';
import Dashboard from './Dashboard/Dashboard';
import ProjectView from './ProjectView/ProjectView';

import Settings from './Settings/Settings';

export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/Dashboard" component={Dashboard} />
        <Route path="/ProjectView/:id/:title" component={ProjectView} />
        <Route path="/Settings" component={Settings} />
      </Switch>
    );
  }
}
