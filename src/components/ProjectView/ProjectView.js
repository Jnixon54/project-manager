import React, { Component } from 'react';
import Header from '../Header/Header';
import { withRouter } from 'react-router-dom';

import './ProjectView.css'

//connect to redux by importing this:
import { connect } from 'react-redux';
import {
  addToList,
  removeFromList,
  addCard,
  cardInput,
  addTask,
  taskInput,
  openInput
} from '../../ducks/reducers/projectViewReducer';

class ProjectView extends Component {
  constructor(props) {
    super(props);

    //   //INITIAL STATE:
    this.state = {
      newItems: '',

      toDos: [],
      newChore: '',
      coolInput: false,
      
    };

    //BINDING METHODS:
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleRemove = this.handleRemove.bind(this);

    this.addCard = this.addCard.bind(this)

    this.addText = this.addText.bind(this)
    this.closeInput = this.closeInput.bind(this)

    this.handle = this.handle.bind(this)
  }

  //METHODS HERE:
  handleInputChange(event) {
    this.setState({ newItems: event.target.value });
  }

  handleAddClick() {
    // console.log(this.props);
    // instead of => this.props.dispatch(addToList(this.state.newItems)); when add {addToList: addToList} in cnnect
    var oldList = this.props.newList;
    oldList.push(this.state.newItems);

    this.props.addToList(oldList);
  }
  handleRemove() {
    console.log(this.props);
    var oldList = this.props.newList;
    oldList.splice(oldList.newItems); //cut out of new list and remove it from the list
    // newList.splice(newList.indexOf(targetItem), 1);

    this.props.removeFromList(oldList);
  }


  addText(){
    this.props.openInput(true)
        
  }//done
  closeInput(){
    this.props.openInput(false)
  }//done


  
  addTask(e){
    e.preventDefault()

    this.props.addTask(this.props.newTask)
    this.props.openInput(false)
  }//done

  
  addCard(e){
    e.preventDefault()
    
    this.props.addCard(this.props.newCard)
  }//done
    
  
  handle(e){
    e.preventDefault();
    this.addTask(e)
  }

  render() {
    return (
      <div>
        <Header />
        <input onChange={this.handleInputChange} />
        <button onClick={this.handleAddClick}>Add Item</button>
        <button onClick={this.handleRemove}>X</button>
        <div id='cardHolder'>
          {this.props.cards.length > 0 &&
            this.props.cards.map((card, index) => 
              <div key={index} id='taskHolder'>
                <h2 className='cardHeader'>{card}</h2>
                {this.props.tasks.length > 0 &&
                  <div>
                    {this.props.tasks.map((toDo, index) => 
                      <div key ={index} className='task'>
                        <div>{toDo}</div>
                      </div>)
                    }
                  </div>
                }
                <div id={this.props.inputOpen ? 'openEditer' : 'cardTest'} onClick={this.addText}>

                  <form action="" onSubmit={this.handle}>
                    <input className='newCard' onChange={this.props.taskInput} type="text"/>
                  </form>
                  {this.state.coolInput === true &&
                    <div className='buttonHolder'>
                      <div onClick={this.addTask} className='save'>Save</div>
                      <div onClick={this.closeInput} className='close'>X</div>
                    </div>
                  }          
                </div>
              </div>
            )
          }
          <form className='cardInput' action="" onSubmit={this.addCard}>
            <input className='newtab' style={{'paddingLeft': '10px'}} placeholder='Input new card!' onChange={this.props.cardInput} type="text"/>
          </form>
        </div>
      </div>
    );
  }
}

//redux will call this function whenever the state in the store changes.REDUX PASSING STATE IN HERE:
const mapStateToProps = state => {
  return state.projectView;
};

export default withRouter(
  connect(mapStateToProps, { addToList, removeFromList, addCard, cardInput, addTask, taskInput, openInput })(ProjectView)
);
