import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {increaseCount} from '../../ducks/reducers/projectViewReducer';

class LandingPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>
      <a href="http://localhost:3001/auth/google" > Google Login Test </a><br />
      <a href="http://localhost:3001/auth/facebook" > Facebook Login Test </a>
      <button onClick={this.props.increaseCount}>Socket Test: Increase Count</button>
      <h1>{this.props.count}</h1>

      Landing Page Added so i could commit</div>;

  }
}
function mapStateToProps(state) {
  return {
    count: state.projectView.count
  }
}

export default connect(mapStateToProps, {increaseCount})(LandingPage);
