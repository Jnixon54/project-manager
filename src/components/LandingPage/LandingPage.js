import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setEmail, setPassword } from './../../ducks/reducers/userReducer';

class LandingPage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <input type="text" placeholder="Email" onChange={this.props.setEmail} />
        <input
          type="password"
          placeholder="Password"
          onChange={this.props.setPassword}
        />
      </div>
    );
  }
}
const mapStateToProps = state => state;

export default connect(mapStateToProps, { setEmail, setPassword })(LandingPage);
