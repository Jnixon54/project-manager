import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setEmail, setPassword } from './../../ducks/reducers/userReducer';
import axios from 'axios';

class LandingPage extends Component {
  constructor(props) {
    super(props);
  }

  submitLogin = () => {
    // Waiting on backend
    // axios.post('/api/login', {
    //   email: this.props.email,
    //   password: this.props.password
    // });
  };

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Email"
          onChange={e => this.props.setEmail(e)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={e => this.props.setPassword(e)}
        />

        <button onClick={() => this.submitLogin()}>Test</button>
      </div>
    );
  }
}
const mapStateToProps = state => state.user;

export default connect(mapStateToProps, { setEmail, setPassword })(LandingPage);
