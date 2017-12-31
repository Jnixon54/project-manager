import React, { Component } from 'react';

import {connect} from 'react-redux'

import {
    editCardHeader,
    handleHeader
  } from '../../../../ducks/reducers/cardReducer'

import '../../ProjectView.css'

class Card extends Component {
    constructor(props){
        super(props)
        this.state = {
            editOpen: false
        }
        this.openHeaderEdit = this.openHeaderEdit.bind(this)
    }

    openHeaderEdit(cardID, title){
        this.setState({editOpen: true})
        this.props.editCardHeader(cardID, title)
    }
    handleHeaderEdit(e){
        this.props.handleHeader(e.target.value)
    }
  
  render() {
      console.log(this.props)
      
    return (
      <div id='taskHolder'>
        {this.state.editOpen === false &&
            <h2 className='cardHeader' onClick={() => this.openHeaderEdit(this.props.card.id, this.props.card.title)}>{this.props.card.title}</h2>
        }
        {this.state.editOpen === true && this.props.editHeaderID !== this.props.card.id &&
            <h2 className='cardHeader' onClick={() => this.openHeaderEdit(this.props.card.id, this.props.card.title)}>{this.props.card.title}</h2>
        }
        {this.state.editOpen === true && this.props.editHeaderID === this.props.card.id &&
            <input className='editHeader' value={this.props.header} onChange={e => this.handleHeaderEdit(e)}></input>
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
    return state.cardReducer;
  };
  
  export default connect(mapStateToProps, { editCardHeader, handleHeader })(Card);
