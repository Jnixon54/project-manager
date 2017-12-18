import React, { Component } from 'react';

import Header from '../Header/Header'

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div>
        <Header/>
      </div>
    )
  }
}
