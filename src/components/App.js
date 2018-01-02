import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import LandingPage from './LandingPage/LandingPage';
import Dashboard from './Dashboard/Dashboard';
import ProjectView from './ProjectView/ProjectView';
import SettingView from './SettingView/SettingView';

import Settings from './SettingView/Settings/Settings';
import Popup from './SettingView/Settings/Popup/Popup';

export default class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/Dashboard" component={Dashboard} />
          <Route path="/ProjectView/:id/:title" component={ProjectView} />
          <Route
            path="/SettingView"
            render={() => (
              <SettingView>
                <Switch>
                  <Route
                    path="/SettingView/Settings"
                    render={() => (
                      <Settings>
                        <Switch>
                          <Route
                            path="/SettingView/Settings/Popup"
                            component={Popup}
                          />
                        </Switch>
                      </Settings>
                    )}
                  />
                </Switch>
              </SettingView>
            )}
          />
        </Switch>
      </div>
    );
  }
}
