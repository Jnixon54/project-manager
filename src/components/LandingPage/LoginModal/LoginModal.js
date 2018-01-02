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
          <h1>
            Get to work.
          </h1>
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