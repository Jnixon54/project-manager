import React, { Component } from 'react';
import Header from '../Header/Header';
import { withRouter } from 'react-router-dom';
import Card from './PVComponents/Card/Card'

//////////////////////////////////////
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
// react dnd stuff

import './ProjectView.css'

//connect to redux by importing this:
import { connect } from 'react-redux';
import {
  addCard,
  getCards2,
  getTasks,
  cardInput,
  memberSearch,
  addGroupMember,
  groupMembers,
  getAssignedTasks,
  removeCurrentMember
} from '../../ducks/reducers/projectViewReducer';

class ProjectView extends Component {
  constructor(props) {
    super(props);

    this.state = {value: "reindeer"}

    //BINDING METHODS
    this.addCard = this.addCard.bind(this)
    this.memberSearchWorkAround = this.memberSearchWorkAround.bind(this)
    this.memberSelect = this.memberSelect.bind(this)
    this.removeMember = this.removeMember.bind(this)
  }
  
  componentDidMount(){
    this.props.getCards2(this.props.match.params.id)
    this.props.getTasks(this.props.match.params.id)
    this.props.groupMembers(this.props.match.params.id)
    this.props.getAssignedTasks(this.props.match.params.id)
  }

  addCard(e) {

    e.preventDefault()
    if(this.props.newCard){

      this.props.addCard(this.props.newCard, this.props.match.params.id).then(res => {
        this.props.getCards2(this.props.match.params.id)
      })
    }
  }//done

  memberSearchWorkAround(e){
    if(e.target.value.length > 2){
    this.props.memberSearch(e.target.value)
    } else{
      this.props.memberSearch()
    }
  }

  memberSelect(currID){
    this.props.addGroupMember(currID, this.props.match.params.id).then(response => {
      this.props.groupMembers(this.props.match.params.id)
    })
  }

  removeMember(e){
      console.log(e.target.value, "HERES YOUR SELECTED MEMBER");
      this.props.removeCurrentMember(e.target.value, this.props.match.params.id).then(res => {
        this.props.groupMembers(this.props.match.params.id)
      })
  }


  render() {
    const cardBox = this.props.cards.map((card, index) => {
      let tasks = this.props.tasks.filter(current => current.parent_card_id === card.id)
      return (
        <Card key={index} card={card} cardTasks={tasks} getNewCards={this.props.getCards2} getNewTasks={this.props.getTasks}/>
      );
    });
    const filteredUsers = 
    this.props.searchedUser.filter((curr, ind, arr) =>  !this.props.members.find(member => member.username === curr.username));

    const getUsers = filteredUsers.map((currUser, ind) => {
        return (
        <h4 key={ind} className="returnedUsers"
        onClick={() => this.memberSelect(currUser.id)}>
        {currUser.username}</h4>)
      })
    return (
      <div>
        <Header />
        <div id='projectBody'>
        <div className="projectInfo">
        <h2>{this.props.match.params.title}</h2>
        <div className="searchedUsers">
        <input type="text" onChange={this.memberSearchWorkAround} />

        {this.props.searchedUser && 
          <div className='returnedUsersBox'>
            {getUsers }
          </div>
        }
        
        </div>
        <select value={this.state.value} onChange={this.removeMember}>
          <option value="reindeer">Remove Teammates</option>
          {this.props.members && this.props.members.map(member => {
              return   <option value={member.id} >{member.username}</option>
          })}
        </select>
        </div>
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

ProjectView = DragDropContext(HTML5Backend)(ProjectView)
export default withRouter(
  connect(mapStateToProps, { addCard, getCards2, getTasks, cardInput, memberSearch, addGroupMember, groupMembers, getAssignedTasks, removeCurrentMember })(ProjectView)
);
