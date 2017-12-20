import React, { Component } from 'react';
import { connect } from 'react-redux';

import './LandingPage.css';
import Header from '../Header/Header';

import GooglePlusSquare from 'react-icons/lib/fa/google-plus-square';
import FacebookSquare from 'react-icons/lib/fa/facebook-square';

class LandingPage extends Component {
  render() {
    return (
      <div className="overall">
        <Header />
        <div className="home">
          Home
          <form>
            <div className="loginForm">
              <h2 className="login">Login Into your Account</h2>
              <br />
              <input className="input" placeholder="Username" /> <br />
              <br />
              <input className="input" placeholder="Password" /> <br />
              <br />
              <button>Register</button>
              <button className="submit">Submit</button>
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
          <p2>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
            convallis nisi a lacus vehicula scelerisque. Etiam hendrerit purus
            velit, eu tristique magna aliquet in. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit.
          </p2>
        </div>

        <div className="contact">
          Contact
          <hr />
          <p2>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
            convallis nisi a lacus vehicula scelerisque. Etiam hendrerit purus
            velit, eu tristique magna aliquet in.{' '}
          </p2>
        </div>

        <div className="guide">
          Guide On How to Use Projek
          <hr />
          <p2>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
            convallis nisi a lacus vehicula scelerisque. Etiam hendrerit purus
            velit, eu tristique magna aliquet in.{' '}
          </p2>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => state.user;

export default connect(mapStateToProps, {})(LandingPage);
