import React, { Component } from 'react';
import Header from '../Header/Header';

//connect to redux by importing this:
import { connect } from 'react-redux';
import { addToList } from '../../ducks/reducers/projectViewReducer';

class ProjectView extends Component {
  constructor(props) {
    super(props);

    //   //INITIAL STATE:
    this.state = {
      newItems: ''
    };

    //BINDING METHODS:
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    this.setState({ newItems: event.target.value });
  }
  handleClick() {
    // console.log(this.props);
    // alert(this.state.newItems);
    // instead of => this.props.dispatch(addToList(this.state.newItems)); when add {addToList: addToList} in cnnect
    this.props.addToList(this.state.newItems);
  }

  render() {
    return (
      <div>
        <Header />
        <input onChange={this.handleChange} />
        <button onClick={this.handleClick}>Add Item</button>
      </div>
    );
  }
}

export default connect(null, { addToList: addToList })(ProjectView);

//redux will call this function whenever the state in the store changes.REDUX PASSING STATE IN HERE:
// function mapStateToProps(state) {  //only for App component
//   return {
//     //this will suscribe to items.
//     items: state.items
//   };
// }
