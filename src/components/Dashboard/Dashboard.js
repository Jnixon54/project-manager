import React, { Component } from 'react';

import Header from '../Header/Header';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Header />
        <div className="Main-container">
          <div className="Content">
            <h1>Test1 + Test2</h1>
            {/* {project} */}
            {/* {task} */}
          </div>
          <div className="Blog">
            <h1>Test3</h1>
            {/* { blog } */}
          </div>
        </div>
      </div>
    );
  }
}
