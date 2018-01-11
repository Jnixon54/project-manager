import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
  getAllTasks,
  completedTask,
  undoCompletedTask
} from './../../../../ducks/reducers/dashboardReducer';
import './TaskMenu.css';

import { getTasks } from './../../../../ducks/reducers/projectViewReducer'
import { withRouter } from 'react-router'



class TaskMenu extends Component{
  constructor(props){
    super(props)
    
    this.completedTask = this.completedTask.bind(this)
    this.undoCompletedTask = this.undoCompletedTask.bind(this)
  }
  componentDidMount(){
    this.props.getAllTasks();
  }


  completedTask(taskID){
    this.props.completedTask(taskID).then(response => {
      this.props.getAllTasks();
      this.props.getTasks(this.props.match.params.id)
    })
  }
  undoCompletedTask(taskID){
    this.props.undoCompletedTask(taskID).then(response => {
      this.props.getAllTasks();
      this.props.getTasks(this.props.match.params.id)
    })
  }
  render(){
    const taskList = this.props.assignedTasks.map((task, index) => {
      console.log(task);
      return (
        <li key={index} className="sidebar-task" >
          <div className={ 'sidebar-task '.concat(task.completed ? 'complete' : null)} onClick={task.completed === true ? () => this.undoCompletedTask(task.task_id) : () =>this.completedTask(task.task_id)}>
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
}

function mapStateToProps(state) {
  return {
    userID: state.user.userID,
    assignedTasks: state.dashboard.assignedTasks,
  }
}

export default withRouter(connect(mapStateToProps, { getAllTasks, completedTask, undoCompletedTask, getTasks })(TaskMenu));