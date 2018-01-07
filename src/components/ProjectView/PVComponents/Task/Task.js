import React, { Component } from 'react';

import axios from 'axios'

import { withRouter } from 'react-router-dom';
import '../../ProjectView.css'
import { connect } from 'react-redux';


/////////////////////////////////////////////////
import { DragSource } from 'react-dnd'
import ItemTypes from '../ItemTypes'
import PropTypes from 'prop-types'
//dnd stuff

import {
  addToList,
  removeFromList,
  addCard,
  cardInput,
  addTask,
  taskInput,
  openInput,
  getCards,
  openEditTask,
  changeEditTask,
  sendEditTask,
  deleteTask,
  getCards2,
  getTasks,
  assignToTask,
  getAssignedTasks,
  removeUserFromTask,
  dragTask,
  movedTask
} from '../../../../ducks/reducers/projectViewReducer';

const cardSource = {
  beginDrag(props) {
      return {
          name: props.task.content,
          id: props.task.task_id
      }
  },

  endDrag(props, monitor) {
      const item = monitor.getItem();
      const dropResult = monitor.getDropResult()

      if (dropResult) {

        let selectedTask = props.tasks.filter(task => item.id === task.task_id)
        if(selectedTask[0].parent_card_id !== dropResult.id){

          let updatedTask = Object.assign({}, selectedTask[0], {parent_card_id: dropResult.id})
          
          let taskProps = props.tasks
          let updatedTaskIndex = taskProps.findIndex(task => task.task_id === selectedTask[0].task_id)
          console.log(props.tasks, taskProps)
          taskProps.splice(updatedTaskIndex, 1, updatedTask)
          props.movedTask(taskProps)
          
                  props.dragTask(item.id, dropResult.id).then(() => {
                    
                    // props.getTasks(props.match.params.id)
                  })
        }
        
      }
  }
}
function collect(connect, monitor) {
  return {
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging()
  }
}




class Task extends Component {
    constructor(props) {
        super(props);
    
        //   //INITIAL STATE:
        this.state = {
          newItems: '',
    
          toDos: [],
          newChore: '',
          coolInput: false,
          deleteTaskTask: 0,
          editAlert: false,
          assignModel: false
        };
    
        //BINDING METHODS
        this.addCard = this.addCard.bind(this)
    
        this.addText = this.addText.bind(this)
        this.closeInput = this.closeInput.bind(this)
    
        this.handleAddTask = this.handleAddTask.bind(this)
        this.editModel = this.editModel.bind(this)
        this.closeEditModal = this.closeEditModal.bind(this)
        this.sendEdit = this.sendEdit.bind(this)
        this.handleDeleteTask = this.handleDeleteTask.bind(this)
        this.openAssign = this.openAssign.bind(this)
        this.assigningOfTasks = this.assigningOfTasks.bind(this)
        this.removeFromTasks = this.removeFromTasks.bind(this)
      }
    
    
    
      addText() {
        this.props.openInput(true)
    
      }//done
      closeInput() {
        this.props.openInput(false)
      }//done
    
    
    
      addTask(e) {
        e.preventDefault()
    
    
      }//done
    
    
      addCard(e) {
    
        e.preventDefault()
        if(this.props.newCard){
    
          this.props.addCard(this.props.newCard, this.props.match.params.id).then(res => {
            this.props.getCards(this.props.match.params.id)
          })
        }
      }//done
    
    
      handleAddTask(e, cardID, projectID) {
    
        e.preventDefault();
        if(this.props.newTask){
          this.props.addTask(this.props.newTask, cardID, projectID).then(res => {
            this.props.getTasks(this.props.match.params.id)
          })
          this.props.openInput(false)
        }
    
      }//done
    
    
      editModel(taskID, task){
        this.setState({editAlert: true})
        this.props.openEditTask(taskID, task)
      }
      closeEditModal(){
        this.setState({editAlert: false, assignModel: false})
      }
      sendEdit(e, taskID, task){
    
        e.preventDefault()
        if(task !== ''){
        this.props.sendEditTask(taskID, task).then(res => {
            this.props.getTasks(this.props.match.params.id)
        })
          this.setState({editAlert: false})
        }
      }
      handleDeleteTask(taskID){
        this.props.deleteTask(taskID).then(res => {
            this.props.getTasks(this.props.match.params.id)
        })
        this.setState({editAlert: false})
      }
    
      
      editHoverID(taskID){
        this.setState({hoverID: taskID})
      }

      openAssign(){
        this.setState({assignModel: !this.state.assignModel})
      }

      assigningOfTasks(taskID, userID, projectID){
        this.props.assignToTask(taskID, userID, projectID).then(() => 
        this.props.getAssignedTasks(this.props.match.params.id))
      }
      removeFromTasks(memberID, taskID){
        this.props.removeUserFromTask(memberID, taskID).then(() => 
        this.props.getAssignedTasks(this.props.match.params.id))
      }
  
  render() {

    const { isDragging, connectDragSource, name } = this.props
    const opacity = isDragging ? 0.4 : 1;
    const userTasks = this.props.assignedTasks ? this.props.assignedTasks.filter( task => task.task_id === this.props.task.task_id) : []
    console.log(userTasks, 'userTasks')
    const style = { opacity: opacity};
    const userFreeMembers = this.props.members ? this.props.members.filter(member => member.id !== this.props.userID) : []
    
    return connectDragSource(
        <div style={style}>
            {!this.state.editAlert && this.props.task.task_id &&
            <div onMouseEnter={() => this.editHoverID(this.props.task.task_id)} onMouseLeave={() => this.editHoverID(0)} className='task'>
                <div className='taskContent'>
                    <div>{this.props.task.content}</div>
                    <div id={this.state.hoverID === this.props.task.task_id ? 'editTaskVisible' : 'editTaskInvisible'} onClick={() => this.editModel(this.props.task.task_id, this.props.task.content)}>
                        <img className='editPic' src='https://i.pinimg.com/originals/29/bd/9c/29bd9c0b601142ada8f8a993b938090e.png' alt=''/>
                    </div>
                </div>
            </div>
            }
            {this.state.editAlert && this.props.editTaskID !== this.props.task.task_id && this.props.task.task_id &&
            <div onMouseEnter={() => this.editHoverID(this.props.task.task_id)} onMouseLeave={() => this.editHoverID(0)} className='task'>
                <div className='taskContent'>
                    <div>{this.props.task.content}</div>
                    <div id={this.state.hoverID === this.props.task.task_id ? 'editTaskVisible' : 'editTaskInvisible'} onClick={() => this.editModel(this.props.task.task_id, this.props.task.content)}>
                        <img className='editPic' src='https://i.pinimg.com/originals/29/bd/9c/29bd9c0b601142ada8f8a993b938090e.png' alt=''/>
                    </div>
                </div>
            </div>
            }
            {this.state.editAlert && this.props.editTaskID === this.props.task.task_id && this.props.task.task_id &&
            <div className='deleteModel'>
                <div className='deleteTaskContent'>
                    <form action="" onSubmit={(e) => this.sendEdit(e, this.props.task.task_id, this.props.editTaskTask)}>
                        <input type='text' className='newCard' onChange={e => this.props.changeEditTask(e)} value={this.props.editTaskTask}/>
                    </form>
                    <div className='confirmationButtons'>
                        <h4 onClick={this.openAssign}>Assign</h4>
                        <h4 onClick={() => this.handleDeleteTask(this.props.task.task_id)}>Delete</h4>
                        <h4 onClick={this.closeEditModal}>Close</h4>
                    </div>
                    
                </div>
                {this.state.assignModel === true &&
                      <div style={{width: '100%'}}>
                      {this.props.assignedTasks.length === 0 && 
                      <h4 style={ userTasks.find(me => me.user_id === this.props.userID) ? {background: 'white'} : {background: 'blue'}}
                      onClick={
                        userTasks.find(me => me.user_id === this.props.userID ) ? 
                        () => this.removeFromTasks(this.props.userID, this.props.task.task_id): 
                        () => this.assigningOfTasks(this.props.task.task_id, this.props.userID, this.props.match.params.id)}
                      >Me!</h4>}

                        {this.props.assignedTasks.length > 0 && 
                      <h4 style={
                        userTasks.find(currentID =>  currentID.user_id === this.props.userID ) ? {background: 'white'} : {background: 'blue'}
                      }
                      onClick={
                        userTasks.find(me => me.user_id === this.props.userID) ? 
                        () => this.removeFromTasks(this.props.userID, this.props.task.task_id) : 
                        () => this.assigningOfTasks(this.props.task.task_id, this.props.userID, this.props.match.params.id)}>Yep im here</h4>
                       }
                        {this.props.members && userFreeMembers.map(member => {
                          const assignedUser = this.props.assignedTasks.filter(task => task.task_id === this.props.task.task_id)
                          
                          return (
                          
                          <h4 className="teamMembers"
                          style={assignedUser.find(currentID => currentID.user_id === member.id)  ? {background: 'white'} : {background: 'blue'}}
                          onClick={
                            assignedUser.find(currentID => currentID.user_id === member.id) ? 
                            () => this.removeFromTasks(member.id, this.props.task.task_id): 
                            () => this.assigningOfTasks(this.props.task.task_id, member.id, this.props.match.params.id)}>
                          {member.username}</h4>)
                        
                        })}
                      </div>
                    }
            </div>
            }
        </div>
    );
  }
}

  
const mapStateToProps = state => {
    return state.projectView;
  };

  Task.propType = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired
}
  
Task = DragSource(ItemTypes.CARD, cardSource, collect)(Task)

  export default withRouter(
    connect(mapStateToProps, { addToList, removeFromList, addCard, cardInput, addTask, taskInput, openInput, getCards, openEditTask, changeEditTask, sendEditTask, deleteTask, getCards2, getTasks, assignToTask, getAssignedTasks, removeUserFromTask, dragTask, movedTask })(Task)
  );