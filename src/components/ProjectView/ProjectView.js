import React, { Component } from 'react';
import Header from '../Header/Header';
import { withRouter } from 'react-router-dom';

//connect to redux by importing this:
import { connect } from 'react-redux';
import {
  addToList,
  removeFromList
} from '../../ducks/reducers/projectViewReducer';

class ProjectView extends Component {
  constructor(props) {
    super(props);

    //   //INITIAL STATE:
    this.state = {
      newItems: ''
    };

    //BINDING METHODS:
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
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

  render() {
    console.log(this.props);
    return (
      <div>
        <Header />
        <input onChange={this.handleInputChange} />
        <button onClick={this.handleAddClick}>Add Item</button>
        <button onClick={this.handleRemove}>X</button>
      </div>
    );
  }
}

//redux will call this function whenever the state in the store changes.REDUX PASSING STATE IN HERE:
const mapStateToProps = state => {
  return state.projectView;
};

export default withRouter(
  connect(mapStateToProps, { addToList, removeFromList })(ProjectView)
);
