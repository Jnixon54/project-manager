import React, { Component } from 'react';
import Header from '../Header/Header';
import { withRouter } from 'react-router-dom';
import Card from './PVComponents/Card/Card'

import './ProjectView.css'

//connect to redux by importing this:
import { connect } from 'react-redux';
import {
  addCard,
  getCards2,
  getTasks,
  cardInput
} from '../../ducks/reducers/projectViewReducer';

class ProjectView extends Component {
  constructor(props) {
    super(props);

    //BINDING METHODS
    this.addCard = this.addCard.bind(this)
  }
  
  componentDidMount(){
    this.props.getCards2(this.props.match.params.id)
    this.props.getTasks(this.props.match.params.id)
  }

  addCard(e) {

    e.preventDefault()
    if(this.props.newCard){

      this.props.addCard(this.props.newCard, this.props.match.params.id).then(res => {
        this.props.getCards2(this.props.match.params.id)
      })
    }
  }//done


  render() {

    const cardBox = this.props.cards.map((card, index) => {
      let tasks = this.props.tasks.filter(current => current.parent_card_id === card.id)
      console.log(this.props.tasks, card)
      return (
        <Card key={index} card={card} cardTasks={tasks} getNewCards={this.props.getCards2}/>
      );
    });
    return (
      <div>
        <Header />
        <div id='projectBody'>
        
          <div id='cardHolder'>
            {this.props.cards.length > 0 &&
              cardBox
            }
            <form className='cardInput' action="" onSubmit={this.addCard}>
              <input className='newtab' style={{ 'paddingLeft': '10pg' }} value={this.props.newCard ? this.props.newCard : ''} placeholder='Input new card!' onChange={this.props.cardInput} type="text" />
            </form>
          </div>
        </div>
      </div>
    )
  }
}

//redux will call this function whenever the state in the store changes.REDUX PASSING STATE IN HERE:

const mapStateToProps = state => {
  return state.projectView;
};

export default withRouter(
  connect(mapStateToProps, { addCard, getCards2, getTasks, cardInput })(ProjectView)
);
