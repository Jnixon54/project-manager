import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LoginModal from '../../LandingPage/LoginModal/LoginModal';

import './HeaderMenu.css';


const Login = (props) => (
  <div className="login-button" onClick={props.toggleModal}>
    <div className="burger-bar"></div>
    <div className="burger-bar"></div>
    <div className="burger-bar"></div>
  </div>
)

const Profile = () => {
  return (
    <div style={{'width': '60px'}}></div>
  )
}

const HeaderMenu = (props) => {
  return (
    <Switch>
      <Route exact path="/" render={() => (<Login toggleModal={props.toggleModal}
                                                      modalOpen={props.modalOpen}/>)} />
      <Route path="/" component={Profile} />
    </Switch>
  )
}

export default HeaderMenu