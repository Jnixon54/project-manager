import React from 'react';
import { connect } from 'react-redux';
import {
  getAllProjects,
  getAllTasks,
  updateNewProjectTitle,
  getTeamProjects
} from './../../../../ducks/reducers/dashboardReducer';
import './TaskMenu.css';



const TaskMenu = (props) => {
  console.log(props.tasks)
  const taskList = props.tasks.map((task, index) => {
    return (
      <div>
        {task.content}
        
      </div>
    )
  })
  console.log(taskList)
  return (
    <div className="task-menu">
      {taskList}
    </div>
  );
}
function mapStateToProps(state) {
  return {
    userID: state.user.userID,
    projects: state.dashboard.projects,
    tasks: state.dashboard.tasks,
  }
}

export default connect(mapStateToProps, { getAllTasks })(TaskMenu);