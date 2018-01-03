import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import axios from 'axios';
import {
  getAllProjects,
  getAllTasks,
  updateNewProjectTitle,
  getTeamProjects
} from './../../ducks/reducers/dashboardReducer';
import Header from '../Header/Header';

import './Dashboard.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toolTip: false
    };
    this.createProjectToolTip = this.createProjectToolTip.bind(this);
    this.sendNewProject = this.sendNewProject.bind(this);
  }
  componentDidMount() {
    this.props.getAllProjects(this.props.userID);
    this.props.getAllTasks(this.props.userID);
    this.props.getTeamProjects(this.props.userID);
  }

  // changes local state to allow tooltip to popup on create new project
  createProjectToolTip() {
    this.setState({ toolTip: !this.state.toolTip });
  }

  //sends new project title from redux and the user.id to the database to create a new project
  //then routes to the project view with the new projects id
  sendNewProject(e) {
    e.preventDefault();
    console.log('USERID: ', this.props.newProjectTitle)
    axios.post('http://localhost:3001/api/addProject', { projectTitle: this.props.newProjectTitle, id: this.props.userID }).then(response => {
      this.props.history.push(`/ProjectView/${response.data[0].id}/${this.props.newProjectTitle}`)
    });
  }

  render() {
    //On page load a box is created and displays information for each project
    const projectBox = this.props.projects.map((project, index) => {
      return (
        <Link to={`/ProjectView/${project.id}/${project.title}`} className="dashboardCards" key={index}>
          <div className="box">

            <div>{project.title}</div>
            <div>{project.owner_id}</div>
            <div>{project.created_at}</div>
            <div>{project.updated_at}</div>

          </div>
        </Link>

      );
    });

    const teamProjects = this.props.teamProjects.map((project, index) => {
      return (
        <Link to={`/ProjectView/${project.id}/${project.title}`} className="dashboardCards" key={index}>
          <div className="box">

            <div>{project.title}</div>
            <div>{project.owner_id}</div>
            <div>{project.created_at}</div>
            <div>{project.updated_at}</div>

          </div>
        </Link>

      );
    });


    const taskBox = this.props.tasks.map((task, index) => {
      let currProj = this.props.projects.filter(myProject => myProject.id === task.parent_project_id)
      return (
        <div className="dashboardTasks" key={index}><div>
          <Link to={`/ProjectView/${task.parent_project_id}/${currProj[0].title}`}>
            {task.content}{console.log("it's rendered")}
          </Link>
        </div>
        </div>

      );
    });

    //creates a tooltip to allow the entry of a project title, form allows for enter to add to database and route to project view
    const projectToolTip = (
      <div className="projectToolTip">
        <h3>Project Title</h3>
        <form onSubmit={e => this.sendNewProject(e)}>
          <input onChange={e => this.props.updateNewProjectTitle(e)} />
        </form>
      </div>
    );

    return (
      <div>
        <Header />
        <div className="projectsAndTasks">
          <div className="projectContainer">
            <div className="box" onClick={() => this.createProjectToolTip()}>
              <div>Create a project!</div>
            </div>
            {this.state.toolTip && projectToolTip}
            {this.props.projects && projectBox}
          </div>
          <div className="taskContainer">
            <h2>Tasks</h2>
            <hr />
            {this.props.tasks && taskBox}
          </div>
        </div>
          <h1>Team Projects</h1>
          <div className="projectContainer">
          {this.props.teamProjects &&  teamProjects}

          </div>

      </div>
    );
  }
}
// const mapStateToProps = state => state.dashboard;

function mapStateToProps(state) {
  return {
    userID: state.user.userID,
    projects: state.dashboard.projects,
    tasks: state.dashboard.tasks,
    newProjectTitle: state.dashboard.newProjectTitle,
    teamProjects: state.dashboard.teamProjects

  }
}

export default connect(mapStateToProps, {
  getAllProjects,
  getAllTasks,
  updateNewProjectTitle,
  getTeamProjects
})(Dashboard);

