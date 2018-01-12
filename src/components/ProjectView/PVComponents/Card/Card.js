import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Task from '../Task/Task';

import axios from 'axios';

///////////////////////////////////////////
import { DropTarget } from 'react-dnd';
import ItemTypes from '../ItemTypes';
import PropTypes from 'prop-types';

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
} from '../../../../ducks/reducers/cardReducer';

// import '../../ProjectView.css';
import './Card.css';

import ColorPicker from './../../../tools/ColorPicker/ColorPicker';

const cardTarget = {
  drop(props) {
    return { name: props.card.title, id: props.card.id };
  }
};
function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editOpen: false,
      options: false,
      colorsOpen: false,
      cardID: 0
    };
    this.openHeaderEdit = this.openHeaderEdit.bind(this);
    this.openEditOptions = this.openEditOptions.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
    this.closeEditOptions = this.closeEditOptions.bind(this);
    this.showColors = this.showColors.bind(this);
    this.pickColor = this.pickColor.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this)
  }

  cancelEdit() {
    this.setState({options: false, editOpen: !this.state.editOpen})
    this.props.editCardHeader(0, '');
  }
  openHeaderEdit(cardID, title) {
    this.setState({ editOpen: !this.state.editOpen, options: false });
  }
  handleHeaderEdit(e) {
    this.props.handleHeader(e.target.value);
  }
  submitHeaderEdit(e, header, id) {
    e.preventDefault();
    this.props.updateHeader(header, id).then(response => {
      this.setState({ editOpen: false });
      this.props.getNewCards(this.props.match.params.id);
    });
  }

  openEditOptions(cardID, title) {
    if (cardID === this.props.editHeaderID) {
      this.setState({ options: false, editOpen: !this.state.editOpen });
      this.props.editCardHeader(0, '');
    } else {
      this.setState({ options: true });
      this.props.editCardHeader(cardID, title);
    }
  }

  closeEditOptions() {
    this.setState({ options: false });
  }
  deleteCard(cardID) {
    this.props.deleteAllTasks(cardID).then(response => {
      this.props.deleteCard(cardID).then(resp => {
        this.props.getNewCards(this.props.match.params.id);
      });
    });
  }

  selectCard(cardID) {
    this.props.selectedTaskInput(cardID);
  }

  handleAddTask(e, cardID, projectID) {
    e.preventDefault();
    if (this.props.newTask) {
      this.props.addTask(this.props.newTask, cardID, projectID).then(res => {
        this.props.clearNewTask();
        this.props.getNewTasks(this.props.match.params.id);
      });
    }
  } //done

  showColors(cardID) {
    this.setState({ colorsOpen: !this.state.colorsOpen, cardID });
  }

  pickColor(color, cardID) {
    axios.post('/api/changeCardColor', { color, cardID }).then(response => {
      this.props.getNewCards(this.props.match.params.id);
      this.setState({ colorsOpen: !this.state.colorsOpen, cardID });
    });
  }

  render() {
    const { canDrop, isOver, connectDropTarget } = this.props;
    const isActive = isOver;

    // let backgroundColor = '#222';
    // if (isActive) {
    //   backgroundColor = 'darkgreen';
    // } else if (canDrop) {
    //   backgroundColor = 'darkkhaki';
    // }

    // const style = { backgroundColor: backgroundColor };
    const tasks = this.props.cardTasks &&
      this.props.cardTasks.map((task, index) => (
        <Task key={index + task} task={task} />
    ));

    return connectDropTarget(
    <div className="task-card">
        <div className="task-card-header">
        {this.state.editOpen === false &&
          <div>{this.props.card.title}</div>
        }
        {this.state.editOpen === true && this.props.editHeaderID !== this.props.card.id && 
          <div>{this.props.card.title}</div>
        }
        {this.state.editOpen === true && this.props.editHeaderID === this.props.card.id && 
          <div>
            <form onSubmit={e => this.submitHeaderEdit(e, this.props.header, this.props.card.id)}>
              <input className="editHeader" value={this.props.header} onChange={e => this.handleHeaderEdit(e)} />
              <h3 onClick={this.cancelEdit}>Cancel</h3>
            </form>
          </div>
        }
          <div className="dot-menu-container" onClick={() => this.openEditOptions(this.props.card.id, this.props.card.title)}>
            <div className="menu-dot" />
            <div className="menu-dot" />
            <div className="menu-dot" />
          </div>
        
        </div>
        <div className="tasks-in-card-container">
          {tasks}
          <div className="new-task-input">
            <form onSubmit={e => this.handleAddTask(e, this.props.card.id, this.props.match.params.id)}>
              <input className="text-input" type="text" onClick={() => this.selectCard(this.props.card.id) // className="newCard"
                } onChange={this.props.taskInput} value={this.props.taskInputID === this.props.card.id ? this.props.newTask : ''} />
            </form>
          </div>
        </div>

        {this.state.editOpen === false && <div className="card-header">
            
          </div>}
        {this.state.options === true && this.props.card.id === this.props.editHeaderID && 
            <div className="editOptionsBox">
              <h3 onClick={this.openHeaderEdit}>Edit</h3>
              <h3 onClick={() => this.deleteCard(this.props.card.id)}>
                Delete
              </h3>
            </div>}
        

        {/* {this.props.cardTasks &&
          this.props.cardTasks.map((task, index) => (
            <Task key={index + task} task={task} />
          ))} */}

        {
          // Currently The background color is being changed on this div
          // <div id="cardTest" style={{ backgroundColor: this.props.card.color }}>
          //   <form
          //     onSubmit={e =>
          //       this.handleAddTask(
          //         e,
          //         this.props.card.id,
          //         this.props.match.params.id
          //       )
          //     }
          //   >
          //     <input
          //       type="text"
          //       className="newCard"
          //       onClick={() => this.selectCard(this.props.card.id)}
          //       onChange={this.props.taskInput}
          //       value={
          //         this.props.taskInputID === this.props.card.id
          //           ? this.props.newTask
          //           : ''
          //       }
          //     />
          //   </form>
          //   {/* These two divs are allowing us to position the box absoloutely. Do inline style to override component styling */}
          //   <div style={{ position: 'relative' }}>
          //     <div
          //       style={{ position: 'absolute', top: '-60px', right: '20px' }}
          //     >
          //       {/* <ColorPicker
          //         currentID={this.props.card.id}
          //         colorsOpen={this.state.colorsOpen}
          //         showColors={this.showColors}
          //         currentItem={this.props.card}
          //         pickColor={this.pickColor}
          //       /> */}
          //     </div>
          //   </div>
          // </div>
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
      </div>);
  }
}

Card.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return state.cardReducer;
};

Card = DropTarget(ItemTypes.CARD, cardTarget, collect)(Card);

export default withRouter(
  connect(mapStateToProps, {
    editCardHeader,
    handleHeader,
    updateHeader,
    deleteAllTasks,
    deleteCard,
    selectedTaskInput,
    taskInput,
    addTask,
    clearNewTask
  })(Card)
);
