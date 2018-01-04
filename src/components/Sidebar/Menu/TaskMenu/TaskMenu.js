import React from 'react';
import { connect } from 'react-redux';
import {
  getAllTasks
} from './../../../../ducks/reducers/dashboardReducer';
import './TaskMenu.css';



const TaskMenu = (props) => {
  const taskList = props.tasks.map((task, index) => {
    return (
      <div>
        {task.content}
      </div>
    )
  })
  
  return (
    <div className="task-menu">
      {taskList}
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