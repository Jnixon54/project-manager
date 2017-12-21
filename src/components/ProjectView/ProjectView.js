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
  openInput,
  getCards
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

    //BINDING METHODS
    this.addCard = this.addCard.bind(this)

    this.addText = this.addText.bind(this)
    this.closeInput = this.closeInput.bind(this)

    this.handle = this.handle.bind(this)
  }


  componentDidMount(){
    this.props.getCards(this.props.match.params.id)
  }

  //METHODS HERE:


  addText(){
    this.props.openInput(true)
        
  }//done
  closeInput(){
    this.props.openInput(false)
  }//done


  
  addTask(e){
    e.preventDefault()

    
  }//done

  
  addCard(e){
    e.preventDefault()

    this.props.addCard(this.props.newCard, this.props.match.params.id).then(res => {
      this.props.getCards(this.props.match.params.id)
    })
  }//done
    
  
  handle(e, cardID, projectID){
    e.preventDefault();
    this.props.addTask(this.props.newTask, cardID, projectID).then(res => {
      this.props.getCards(this.props.match.params.id)
    })
    this.props.openInput(false)
  }//done

  render() {
    return (
      <div>
        <Header />
        <div id='projectBody'>
        <div id='cardHolder'>
          {this.props.cards.length > 0 &&
            this.props.cards.map((card, index) => 
              <div key={card.cardHeader + index} id='taskHolder'>
                <h2 className='cardHeader'>{card.cardHeader}</h2>
                {card.tasks.length > 0 &&
                  <div>
                    {card.tasks.map((toDo, index) => 
                        <div key ={toDo + index} className='task'>
                          <div>{toDo}</div>
                        </div>)
                    }
                  </div>
                }
                <div id={this.props.inputOpen ? 'openEditer' : 'cardTest'} onClick={this.addText}>

                  <form action="" onSubmit={(e) => this.handle(e, card.cardID, this.props.match.params.id)}>
                    { index == this.props.cardID ? <input className='newCard' name={index} value={this.props.newTask}onChange={this.props.taskInput} type="text"/> :
                    <input className='newCard' name={index} value={''}onChange={this.props.taskInput} type="text"/>}
                    
                  </form>     
                </div>
              </div>
            )
          }
          <form className='cardInput' action="" onSubmit={this.addCard}>
            <input className='newtab' style={{'paddingLeft': '10px'}} value={this.props.newCard ? this.props.newCard : ''} placeholder='Input new card!' onChange={this.props.cardInput} type="text"/>
          </form>
        </div>
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
  connect(mapStateToProps, { addToList, removeFromList, addCard, cardInput, addTask, taskInput, openInput, getCards })(ProjectView)
);
