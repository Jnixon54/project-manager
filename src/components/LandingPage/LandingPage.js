import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class LandingPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>
      <a href="http://localhost:3001/api/auth/google" >Google Login Test</a>
      Landing Page Added so i could commit</div>;

  }
}
const mapStateToProps = state => state.user;

export default connect(mapStateToProps, {})(LandingPage);
