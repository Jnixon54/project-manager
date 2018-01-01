import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';
import '../../ProjectView.css'
import { connect } from 'react-redux';
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
  getTasks
} from '../../../../ducks/reducers/projectViewReducer';

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
          editAlert: false
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
        console.log(taskID)
        this.props.openEditTask(taskID, task)
      }
      closeEditModal(){
        this.setState({editAlert: false})
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
    
      newTaskSelector(cardID){
        this.setState({taskCardID: cardID})
      }
      editHoverID(taskID){
        this.setState({hoverID: taskID})
      }
  
  render() {
      console.log(this.props)
      
    return (
        <div>
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
                        <h4>Assign</h4>
                        <h4 onClick={() => this.handleDeleteTask(this.props.task.task_id)}>Delete</h4>
                        <h4 onClick={this.closeEditModal}>Close</h4>
                    </div>
                </div>
            </div>
            }
        </div>
    );
  }
}

  
const mapStateToProps = state => {
    return state.projectView;
  };
  
  export default withRouter(
    connect(mapStateToProps, { addToList, removeFromList, addCard, cardInput, addTask, taskInput, openInput, getCards, openEditTask, changeEditTask, sendEditTask, deleteTask, getCards2, getTasks })(Task)
  );