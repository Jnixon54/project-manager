import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  getAllProjects,
  getAllTasks
} from './../../ducks/reducers/dashboardReducer';
import Header from '../Header/Header';

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getAllProjects();
    this.props.getAllTasks();
  }
  render() {
    return (
      <div>
        <Header />
        <div className="Main-container">
          <div className="Content">
            <h1>Test1 + Test2</h1>
            {/* {project} */}
            {/* {task} */}
          </div>
          <div className="Blog">
            <h1>Test3</h1>
            {/* { blog } */}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => state.dashboard;

export default connect(mapStateToProps, { getAllProjects, getAllTasks })(
  Dashboard
);
