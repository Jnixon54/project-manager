import React, { Component } from 'react';
import { connect } from 'react-redux';

class LandingPage extends Component {
  render() {
    return <div>
      <a href="http://localhost:3001/auth/google" > Google Login Test </a><br />
      <a href="http://localhost:3001/auth/facebook" > Facebook Login Test </a>

      Landing Page Added so i could commit</div>;

  }
}
const mapStateToProps = state => state.user;

export default connect(mapStateToProps, {})(LandingPage);
