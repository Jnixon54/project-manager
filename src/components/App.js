import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import LandingPage from './LandingPage/LandingPage';
import Dashboard from './Dashboard/Dashboard';
import ProjectView from './ProjectView/ProjectView';
import SettingView from './SettingView/SettingView';

import Cards from './SettingView/Cards/Cards';
import Profile from './SettingView/Profile/Profile';
import Settings from './SettingView/Settings/Settings';

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/Dashboard" component={Dashboard} />
          <Route path="/ProjectView" component={ProjectView} />
          <Route
            path="/SettingView"
            render={() => (
              <SettingView>
                <Switch>
                  <Route path="/SettingView/Cards" component={Cards} />
                  <Route path="/SettingView/Profile" component={Profile} />
                  <Route path="/SettingView/Settings" component={Settings} />
                </Switch>
              </SettingView>
            )}
          />
        </Switch>
      </div>
    );
  }
}
