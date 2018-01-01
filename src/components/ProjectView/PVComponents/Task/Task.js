import React, { Component } from 'react';

import '../../ProjectView.css'

class Task extends Component {

  
  render() {
      console.log(this.props)
      
    return (

      <div>
        {this.props.task.content}
      </div>
    );
  }
}

  
  export default Task;
