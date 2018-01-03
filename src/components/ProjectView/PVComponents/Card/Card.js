import React, { Component } from 'react';

import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import Task from '../Task/Task'


///////////////////////////////////////////
import { DropTarget } from 'react-dnd'
import ItemTypes from '../ItemTypes'
import PropTypes from 'prop-types'

//dnd stuff

import {
    editCardHeader,
    handleHeader,
    updateHeader,
    deleteCard,
    deleteAllTasks,
    selectedTaskInput,
    taskInput,
    addTask,
    clearNewTask
  } from '../../../../ducks/reducers/cardReducer'

import '../../ProjectView.css'


const cardTarget = {
    drop(props) {
        return { name: props.card.title, id: props.card.id}
    }
}
function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
    }
}


class Card extends Component {
    constructor(props){
        super(props)
        this.state = {
            editOpen: false,
            options: false
        }
        this.openHeaderEdit = this.openHeaderEdit.bind(this)
        this.openEditOptions = this.openEditOptions.bind(this)
        this.deleteCard = this.deleteCard.bind(this)
        this.closeEditOptions = this.closeEditOptions.bind(this)
    }

    openHeaderEdit(cardID, title){
        this.setState({editOpen: !this.state.editOpen, options: false}) 

    }
    handleHeaderEdit(e){
        this.props.handleHeader(e.target.value)
    }
    submitHeaderEdit(e, header, id){
        e.preventDefault()
        this.props.updateHeader(header, id).then(response => {
            this.setState({editOpen: false})
            this.props.getNewCards(this.props.match.params.id)
        })
    }

    openEditOptions(cardID, title){
        if(cardID === this.props.editHeaderID){
            this.setState({options: false})
            this.props.editCardHeader(0, '')
        }
        else {
            this.setState({options: true})
            this.props.editCardHeader(cardID, title)
        }
    }
    closeEditOptions(){
        this.setState({options: false})
    }
    deleteCard(cardID){
        this.props.deleteAllTasks(cardID).then(response => {
            this.props.deleteCard(cardID).then(resp => {
                this.props.getNewCards(this.props.match.params.id)
            })
        })
    }

    selectCard(cardID){
        this.props.selectedTaskInput(cardID)
    }

    handleAddTask(e, cardID, projectID) {
        
        e.preventDefault();
            if(this.props.newTask){
                this.props.addTask(this.props.newTask, cardID, projectID).then(res => {
                    this.props.clearNewTask()
                    this.props.getNewTasks(this.props.match.params.id)
                })
            }
        
    }//done


    
  
  render() {
    const { canDrop, isOver, connectDropTarget } = this.props
    const isActive =  isOver;

    let backgroundColor = '#222'
    if(isActive){
        backgroundColor = 'darkgreen'
    } else if (canDrop) {
        backgroundColor = 'darkkhaki'
    }

    const style = {'backgroundColor': backgroundColor}

      
    return connectDropTarget(
      <div id='taskHolder' style={style}>
        {this.state.editOpen === false &&
            <div className='titleHolder'>
                <div className='cardHeader'>
                    {this.props.card.title}
                    <img id='downArrow' src='http://freevector.co/wp-content/uploads/2010/10/61041-downwards-arrow-key.png' onClick={() => this.openEditOptions(this.props.card.id, this.props.card.title)}/>
                </div>

                {this.state.options === true && this.props.card.id === this.props.editHeaderID &&
                    <div className='editOptionsBox'>
                        <h3 onClick={ this.openHeaderEdit}>Edit</h3>
                        <h3 onClick={() =>  this.deleteCard(this.props.card.id)}>Delete</h3>
                    </div>
                }
            </div>
        }
        {this.state.editOpen === true && this.props.editHeaderID !== this.props.card.id &&
            <div className='titleHolder'>
                <div className='cardHeader'>
                    {this.props.card.title}
                    <img id='downArrow' src='http://freevector.co/wp-content/uploads/2010/10/61041-downwards-arrow-key.png' onClick={() => this.openEditOptions(this.props.card.id, this.props.card.title)}/>
                </div>

                {this.state.options === true && this.props.card.id === this.props.editHeaderID &&
                    <div className='editOptionsBox'>
                        <h3 onClick={this.openHeaderEdit}>Edit</h3>
                        <h3 onClick={() =>  this.deleteCard(this.props.card.id)}>Delete</h3>
                    </div>
                }
            </div>
        }
        {this.state.editOpen === true && this.props.editHeaderID === this.props.card.id &&
            <form onSubmit={e => this.submitHeaderEdit(e, this.props.header, this.props.card.id)}>
                <input className='editHeader' value={this.props.header} onChange={e => this.handleHeaderEdit(e)} />
                <h3 onClick={this.openHeaderEdit}>Cancle</h3>
            </form>
        }
        
        {this.props.cardTasks &&
            this.props.cardTasks.map((task, index) => <Task key={index + task} task={task}/>)
        }
        
        {
            <div id='cardTest'>
                <form onSubmit={e => this.handleAddTask(e, this.props.card.id, this.props.match.params.id)}>
                    <input  type='text' 
                            className='newCard' 
                            onClick={() => this.selectCard(this.props.card.id)}
                            onChange={this.props.taskInput} 
                            value={this.props.taskInputID === this.props.card.id ? this.props.newTask : ''}/>
                </form>
            </div>
        }
        {/* <div id={this.props.inputOpen && this.state.taskCardID === card.cardID ? 'openEditer' : 'cardTest'} onClick={this.addText}>

            <form action="" onSubmit={(e) => this.handleAddTask(e, card.cardID, this.props.match.params.id)}>
                <input  className='newCard' 
                        onClick={() => this.newTaskSelector(card.cardID)} 
                        name={index} 
                        value={this.state.taskCardID === card.cardID ? this.props.newTask : ''} 
                        onChange={this.props.taskInput} 
                        type="text"/>
            </form>     
        </div> */}
      </div>
    );
  }
}

Card.propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired
}

const mapStateToProps = state => {
    return state.cardReducer;
  };

  Card = DropTarget(ItemTypes.CARD, cardTarget, collect)(Card)
  
  export default withRouter(connect(mapStateToProps, { editCardHeader, handleHeader, updateHeader, deleteAllTasks, deleteCard, selectedTaskInput, taskInput, addTask, clearNewTask })(Card));
