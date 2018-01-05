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
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import {getUserInfo} from './../../ducks/reducers/userReducer'
import ColorPicker from './../tools/ColorPicker/ColorPicker'

import './Dashboard.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toolTip: false,
      currColor: '',
      colorsOpen: false,
      projID: 0
    };
    this.createProjectToolTip = this.createProjectToolTip.bind(this);
    this.sendNewProject = this.sendNewProject.bind(this);
    this.pickColor = this.pickColor.bind(this)
    this.showColors = this.showColors.bind(this)
  }
  componentDidMount() {
    this.props.getAllProjects();
    this.props.getAllTasks();
    this.props.getTeamProjects();
    this.props.getUserInfo()
  }

  // changes local state to allow tooltip to popup on create new project
  createProjectToolTip() {
    this.setState({ toolTip: !this.state.toolTip });
  }

  //sends new project title from redux and the user.id to the database to create a new project
  //then routes to the project view with the new projects id
  sendNewProject(e) {
    e.preventDefault();
    // console.log('USERID: ', this.props.newProjectTitle)
    axios.post('/api/addProject', { projectTitle: this.props.newProjectTitle}).then(response => {
      this.props.history.push(`/ProjectView/${response.data[0].id}/${this.props.newProjectTitle}`)
    });
  }

  pickColor(color, projectID){
    console.log(color, projectID);
    axios.post('/api/changeColor', {color, projectID}).then(response => {
      this.props.getAllProjects();
      this.setState({colorsOpen: !this.state.colorsOpen, projectID})
    })
  }
  showColors(projID){
    this.setState({colorsOpen: !this.state.colorsOpen, projID})
    console.log("Hit!");
  }

  render() {
    //On page load a box is created and displays information for each project
    const projectBox = this.props.projects.map((project, index) => {
      return (
        <div key={index} className="outer-project-box">
          
          <Link to={`/ProjectView/${project.id}/${project.title}`} className="dashboardCards" key={index}>
            <div className="project-card" style={ project.color && {'backgroundColor': `${project.color}`}}>
              <div className="card-header">
              {project.title}
              </div>
            </div>
          </Link>
          
         <ColorPicker currentID={this.state.projID} colorsOpen={this.state.colorsOpen} showColors={this.showColors} currentItem={project} pickColor={this.pickColor}/>
        </div>
      )
    });

    const teamProjects = this.props.teamProjects.map((project, index) => {
      return (
        <Link to={`/ProjectView/${project.id}/${project.title}`} className="dashboardCards" key={index}>
          <div className="project-card">
            <div className="card-header">{project.title}</div>
          </div>
        </Link>
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
      <div className="dashboard-container">
        <div className="container">
          <Header />
          <div className="projects-container">
          <h1>Personal Boards</h1>
            <div className="projects-container-inner">
                <div className="project-card create-item" onClick={() => this.createProjectToolTip()}>
                  <div className="add-circle">
                    +
                  </div>
                </div>
                {this.state.toolTip && projectToolTip}
                {this.props.projects && projectBox}
            </div>
            <h1>Collaborative Boards</h1>
            <div className="projects-container-inner">
              {this.props.teamProjects &&  teamProjects}
            </div>
          </div>
        </div>
        <Sidebar id={"dashboard-sidebar"} showLogo={true}/>
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
  getTeamProjects,
  getUserInfo
})(Dashboard);

