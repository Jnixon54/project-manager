import React, { Component } from 'react'
import {
  updateUserInputField,
  updatePasswordInputField,
  onSubmitRegister,
  onSubmitLogin
} from '../../../ducks/reducers/userReducer';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import './LoginModal.css';

class LoginModal extends Component {
  render () {
    return (
      <div className="login-modal-container">
        <div className="login-modal">
          <h1 id="modal-header">
            Get to work.
          </h1>
          <div className="local-login">
          <input
              className="input login-input"
              placeholder="Username"
              onChange={e => this.props.updateUserInputField(e.target.value)}
              value={this.props.usernameInput}
          />
          <input
              className="input login-input"
              placeholder="Password"
              onChange={e =>
                this.props.updatePasswordInputField(e.target.value)
              }
              value={this.props.passwordInput}
          />
          <div className="login-button-container">
            <button
              className="login-submit-button"
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
          <button
              className="login-submit-button"
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
            </div>
            </div>
            <div className="separator">
              <span className="line">
              </span>
              <span>or</span>
              <span className="line">
              </span>
            </div>
            <div className="social-login">
              <a href="/auth/google" className="social-login-button" id="google-login">
              <div className="logo-wrapper">
                <div id="google-logo">
                </div>
                <div className="social-text">
                  Sign in with Google
                </div>
              </div>
              </a>
              <a href="/auth/facebook" className="social-login-button" id="facebook-login">
                <div className="logo-wrapper">
                <div id="facebook-logo">
                </div>
                <div className="social-text">
                  Sign in with Facebook
                </div>
                </div>
              </a>
            </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    usernameInput: state.user.usernameInput,
    passwordInput: state.user.passwordInput
  };
}

export default withRouter(connect(mapStateToProps, {
  updateUserInputField,
  updatePasswordInputField,
  onSubmitRegister,
  onSubmitLogin
})(LoginModal))