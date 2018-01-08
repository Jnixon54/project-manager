import React from 'react';
import { connect } from 'react-redux';
import {
  getAllTasks
} from './../../../../ducks/reducers/dashboardReducer';
import './TaskMenu.css';



const TaskMenu = (props) => {
  const taskList = props.tasks.map((task, index) => {
    console.log(task);
    return (
      <li className="sidebar-task">
        <div className={ 'sidebar-task '.concat(task.complete ? 'complete' : null)} onClick={''}>
        {task.content}
        </div>
      </li>
    )
  })
  
  return (
    <div className="task-menu">
    <div className="container">
      <div className="header-container task-list-header" >
        To-do
      </div>
      <ul className="sidebar-list">
        { taskList }
      </ul>
    </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    userID: state.user.userID,
    tasks: state.dashboard.tasks,
  }
}

export default connect(mapStateToProps, { getAllTasks })(TaskMenu);