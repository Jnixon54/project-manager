import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import {
  updateUserInputField,
  updatePasswordInputField,
  onSubmitRegister,
  onSubmitLogin
} from '../../ducks/reducers/userReducer';

import './LandingPage.css';
import Header from '../Header/Header';

import GooglePlusSquare from 'react-icons/lib/fa/google-plus-square';
import FacebookSquare from 'react-icons/lib/fa/facebook-square';

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialAnimation: false
    };
  }

  componentDidMount() {
    this.animationTimeout = setTimeout(() => {
      this.setState({initialAnimation: true});
    }, 100); 
  }

  componentWillUnmount() {
    if (this.animationTimeout) {
      clearTimeout(this.animationTimeout);
    }
  }
  // onSubmitRegister(username, password){
  //   axios
  //     .post('http://localhost:3001/register/', {
  //       username: username,
  //       password: password
  //     })
  //     .then(response => this.props.history.push('/dashboard'))
  // }

  render() {
    let animationClasses = [];
    animationClasses.push(this.state.initialAnimation ? 'after' : null);
    console.log(animationClasses)
    return (
      <div className="landing-container">
        <Header id="HeaderBar">
        </Header>
        <div className="container">
          <div className="welcome-content">
            <div className="welcome-text">
              <div className={"welcome-box create " + animationClasses.join(' ')} id="create">
              </div>
            </div>
            <div className="welcome-text">
              <div className={"welcome-box collab " + animationClasses.join(' ')} id="collab">
              </div>
            </div>
            <div className="welcome-text">
              <div className={"welcome-box complete " + animationClasses.join(' ')} id="complete">
              </div>
            </div>
          </div>
          {/* <div className="login-form">
            <h2 className="login">Get to work.</h2>
            <input
              className="input"
              placeholder="Username"
              onChange={e => this.props.updateUserInputField(e.target.value)}
              value={this.props.usernameInput}
              // type="text"
            />
            <input
              className="input"
              placeholder="Password"
              onChange={e =>
                this.props.updatePasswordInputField(e.target.value)
              }
              value={this.props.passwordInput}
            />
            <button
              onClick={e => {
                e.preventDefault();
                this.props.onSubmitRegister(
                  this.props.usernameInput,
                  this.props.passwordInput
                ).then(() => {
                  this.props.history.push('/dashboard')
                }).catch();
              }}
              type="submit"
            >
              Register
            </button>
            <button
              className="submit"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                this.props.onSubmitLogin(
                  this.props.usernameInput,
                  this.props.passwordInput
                ).then(() => {
                  this.props.history.push('/dashboard')
                }).catch();}}
            >
              Login
            </button>
            <button className="login-google">
              <a href="http://localhost:3001/auth/google">
                <GooglePlusSquare /> Signin With Google{' '}
              </a>
            </button>
            <button className="login-facebook">
              <a href="http://localhost:3001/auth/facebook">
                <FacebookSquare /> Signin With Facebook{' '}
              </a>
            </button>
          </div> */}
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    count: state.projectView.count,
    usernameInput: state.user.usernameInput,
    passwordInput: state.user.passwordInput
  };
}

export default connect(mapStateToProps, {
  updateUserInputField,
  updatePasswordInputField,
  onSubmitRegister,
  onSubmitLogin
})(LandingPage);
