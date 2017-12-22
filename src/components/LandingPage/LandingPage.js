import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { increaseCount } from '../../ducks/reducers/projectViewReducer';
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
  render() {
    return (
      <div className="overall">
        <header id="HeaderBar">
          <img
            className="logo"
            src="https://i.pinimg.com/236x/05/00/c8/0500c8d129dabb81af2ea998558c8cc0.jpg"
            alt=""
          />
        </header>
        <div className="home">
          Home
          <form>
            <div className="loginForm">
              <h2 className="login">Login Into your Account</h2>
              <br />
              <input
                className="input"
                placeholder="Username"
                onChange={e => this.props.updateUserInputField(e.target.value)}
                value={this.props.usernameInput}
                // type="text"
              />{' '}
              <br />
              <br />
              <input
                className="input"
                placeholder="Password"
                onChange={e =>
                  this.props.updatePasswordInputField(e.target.value)
                }
                value={this.props.passwordInput}
              />{' '}
              <br />
              <br />
              <button
                onClick={e => {
                  e.preventDefault();
                  this.props.onSubmitRegister(
                    this.props.usernameInput,
                    this.props.passwordInput
                  );
                }}
                type="submit"
              >
                Register
              </button>
              <button
                className="submit"
                type="submit"
                onClick={this.props.onSubmitLogin}
              >
                Submit
              </button>
              <hr />
              <button className="loginGoogle">
                {' '}
                <a href="http://localhost:3001/auth/google">
                  <GooglePlusSquare /> Signin With Google{' '}
                </a>
              </button>{' '}
              <br />
              <br />
              <button className="loginFacebook">
                <a href="http://localhost:3001/auth/facebook">
                  <FacebookSquare /> Signin With Facebook{' '}
                </a>
              </button>
            </div>
          </form>
        </div>

        <div className="about">
          About
          <hr />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
            convallis nisi a lacus vehicula scelerisque. Etiam hendrerit purus
            velit, eu tristique magna aliquet in. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit.
          </p>
        </div>

        <div className="contact">
          Contact
          <hr />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
            convallis nisi a lacus vehicula scelerisque. Etiam hendrerit purus
            velit, eu tristique magna aliquet in.{' '}
          </p>
        </div>

        <div className="guide">
          Guide On How to Use Projek
          <hr />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
            convallis nisi a lacus vehicula scelerisque. Etiam hendrerit purus
            velit, eu tristique magna aliquet in.{' '}
          </p>
        </div>
        <button onClick={this.props.increaseCount}>
          Socket Test: Increase Count
        </button>
        <h1>{this.props.count}</h1>
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
  increaseCount,
  updateUserInputField,
  updatePasswordInputField,
  onSubmitRegister,
  onSubmitLogin
})(LandingPage);
