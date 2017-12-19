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
    const projectBox = this.props.projects.map((project, index) => {
      return (
        <div key={index}>
          <div>{project.title}</div>
          <div>{project.owner_id}</div>
        </div>
      );
    });

    return (
      <div>
        {' '}
        <Header />
        {this.props.projects && projectBox}
      </div>
    );
  }
}
const mapStateToProps = state => state.dashboard;

export default connect(mapStateToProps, { getAllProjects, getAllTasks })(
  Dashboard
);
