import React, { Component } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { withRouter } from 'react-router-dom';
import Card from './PVComponents/Card/Card'
import Header from '../../components/Header/Header';

//////////////////////////////////////
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
// react dnd stuff

// import './ProjectView.css'

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
  removeCurrentMember,
  deleteProject,
  sendNewTitle,
  getLocalUser,
  resetCards
} from '../../ducks/reducers/projectViewReducer';

class ProjectView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "reindeer",
      title: this.props.match.params.title,
      titleEditor: false
    }

    //BINDING METHODS
    this.addCard = this.addCard.bind(this)
    this.memberSearchWorkAround = this.memberSearchWorkAround.bind(this)
    this.memberSelect = this.memberSelect.bind(this)
    this.removeMember = this.removeMember.bind(this)
    this.deleteProject = this.deleteProject.bind(this)
    this.editTitle = this.editTitle.bind(this)
    this.openEditTitle = this.openEditTitle.bind(this)
    this.sendNewTitle = this.sendNewTitle.bind(this)
  }
  
  componentDidMount(){
    this.props.getCards2(this.props.match.params.id)
    this.props.getTasks(this.props.match.params.id)
    this.props.groupMembers(this.props.match.params.id)
    this.props.getAssignedTasks(this.props.match.params.id)
    this.props.getLocalUser()
  }

  componentWillUnmount(){
    this.props.resetCards();
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
      this.props.removeCurrentMember(e.target.value, this.props.match.params.id).then(res => {
        this.props.groupMembers(this.props.match.params.id)
      })
  }

  deleteProject(){
    this.props.deleteProject(this.props.match.params.id).then(response => {
      this.props.history.push('/dashboard')
    })
  }
  editTitle(e){
    this.setState({title: e.target.value})
    console.log(e.target.value);
  }
  openEditTitle(){
    this.setState({titleEditor: !this.state.titleEditor})
  }
  sendNewTitle(e){
    e.preventDefault()
    this.setState({titleEditor: !this.state.titleEditor})
    this.props.sendNewTitle(this.state.title, this.props.match.params.id)
  }
  
  render() {
    const cardBox = this.props.cards.map((card, index) => {
      let tasks = this.props.tasks.filter(current => current.parent_card_id === card.id)
      return (
        <Card key={index} card={card} cardTasks={tasks} getNewCards={this.props.getCards2} getNewTasks={this.props.getTasks}/>
      );
    });
    const filteredUsers = 
    this.props.searchedUser.filter((curr, ind, arr) =>  !this.props.members.find(member => member.id === curr.id));

    const getUsers = filteredUsers.map((currUser, ind) => {
                    return (
                    <h4 key={ind} className="returnedUsers"
                        onClick={() => this.memberSelect(currUser.id)}> {currUser.display_name} </h4>
                        )})

    return (
      <div className="dashboard-container">
        <div className="container">
          <Header path={"Board"} currentPath={this.state.title}/>
          <Sidebar id={"project-sidebar"} showLogo={true}/>
          
          <div id='projectBody'>
          <div className="projectInfo">
            {this.state.titleEditor &&
          <form onSubmit={this.sendNewTitle}>
            <input type='text' value={this.state.title} onChange={this.editTitle}/>
            <h3 onClick={this.deleteProject}>Delete project</h3>
          </form>
        }

        <form className='cardInput' action="" onSubmit={this.addCard}>
          <input className='header-input' style={{ 'paddingLeft': '10pg' }} value={this.props.newCard ? this.props.newCard : ''} placeholder='Add New List' onChange={this.props.cardInput} type="text" />
        </form>

        <div className="searchedUsers">
          <input className="header-input" placeholder="Add Collaborator" type="text" onChange={this.memberSearchWorkAround} />
        {this.props.searchedUser && 
          <div className='returnedUsersBox'>
            {getUsers }
          </div>
        }
        </div>

        {/* <button onClick={this.openEditTitle}>Edit</button> */}

        <select value={this.state.value} onChange={this.removeMember}>
          <option value="reindeer">Remove Teammates</option>
          {this.props.members && this.props.members.map((member, memindex) => {
              return <option key={memindex} value={member.id} >{member.display_name}</option>
          })}
        </select>
        
        </div>
          <div id='cardHolder'>
            {this.props.cards.length > 0 &&
              cardBox
            }
            
          </div>
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
  connect(mapStateToProps, { addCard, getCards2, getTasks, cardInput, memberSearch, addGroupMember, groupMembers, getAssignedTasks, removeCurrentMember, deleteProject, sendNewTitle, getLocalUser, resetCards })(ProjectView)
);
