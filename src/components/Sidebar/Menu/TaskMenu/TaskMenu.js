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

''


  completedTask(taskID){
    console.log(taskID);
    this.props.completedTask(taskID).then(response => {
      this.props.getAllTasks();
      if (this.props.match.params.id){
      this.props.getTasks(this.props.match.params.id)
      }
    })
  }
  undoCompletedTask(taskID){
    this.props.undoCompletedTask(taskID).then(response => {
      this.props.getAllTasks();
      if (this.props.match.params.id){
        this.props.getTasks(this.props.match.params.id)
        }
    })
  }
  render(){

    const taskList = this.props.assignedTasks.map((task, index, arr) => {
          
      return (
        <div key={index}>
           <div  className=" task-section" >
          <div>
        <p className="task-list-header" >{task.title}</p>
          {  task.tasks.map((currTask, ind) => {
            {console.log(currTask);}
            return <div key={ind} className={ 'sidebar-task '.concat(currTask.completed ? 'complete' : null)} 
            onClick={currTask.completed === true ? () => this.undoCompletedTask(currTask.id) : 
            () =>this.completedTask(currTask.id)} >
            <li>{currTask.content}</li>
            </div>
          })}
        </div>
      </div>
        </div>
      )
    })


  return (
    <div className="task-menu">
    <div className="container">
      <div className="header-container task-list-header" >
        To-do
      </div>
      <hr />
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