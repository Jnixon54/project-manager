import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import './LandingPage.css';
import Sidebar from '../Sidebar/Sidebar';

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialAnimation: false,
      passiveAnimation: false
    };
  }

  componentDidMount() {
    this.animationTimeout = setTimeout(() => {
      this.setState({initialAnimation: true});
    }, 100); 
    this.passiveAnimationInterval = setInterval(()=> {
      this.setState({passiveAnimation: !this.state.passiveAnimation})
    }, 2000);
    
    this.timeouts = [this.animationTimeout, this.passiveAnimationInterval];
  }

  componentWillUnmount() {
    this.timeouts.forEach((timeout) => {
      if (timeout) {
        clearTimeout(timeout);
      }
    })
  }
  // onSubmitRegister(username, password){
  //   axios
  //     .post('http://localhost:3001/register/', {
  //       username: username,
  //       password: password
  //     })
  //     .then(response => this.props.history.push('/dashboard'))
  // }

  render() {
    console.log(this.passiveAnimationInterval)
    let animationClasses = [];
    animationClasses.push(this.state.initialAnimation ? 'after' : null);
    animationClasses.push(this.state.passiveAnimation ? 'toggle' : null);
    return (
      <div className="landing-container">
        <div className="container welcome-container">
          <div className={"big-landing-text " + animationClasses.join(' ')}>Group<span>i</span><span>i</span></div>
          <div className="welcome-content">
            <div className="welcome-text">
              <div className={"welcome-banner banner-0 " + animationClasses.join(' ')} id="banner-0">
              </div>
            </div>
            <div className="welcome-text">
              <div className={"welcome-banner banner-1 " + animationClasses.join(' ')} id="banner-1">
              </div>
            </div>
            <div className="welcome-text">
              <div className={"welcome-banner banner-2 " + animationClasses.join(' ')} id="banner-2">
              </div>
            </div>
            <div className="welcome-text">
              <div className={"welcome-banner banner-3 " + animationClasses.join(' ')} id="banner-3">
              </div>
            </div>
          </div>
        </div>
        <Sidebar id={"landing-sidebar"} />
      </div>
    );
  }
}
export default LandingPage;
