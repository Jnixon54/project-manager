import React, { Component } from 'react';
import '../SettingView.css';
// import Popup from '../../Popup/Popup';
import { Link } from 'react-router-dom';

// import Header from '../../Header/Header';

// import { Link } from 'react-router-dom';

export default class Settings extends Component {
  constructor() {
    super();
    this.state = {
      showPopups: false
    };
    // this.togglePopup = this.togglePopup.bind(this);
  }
  // togglePopup(showPopup) {
  //   this.setState({
  //     showPopups: this.state.showPopups(showPopup)
  //   });
  // }
  render() {
    return (
      <div>
        <br />
        <div className="settings">
          <h3>Account Details</h3>
          {/* <li onClick={this.togglePopup}>Change Name, initial, or Bio...</li> */}

          <Link to="/SettingView/Settings/Popup">
            <li>Change Name, initial, or Bio...</li> {this.props.children}
          </Link>

          <li>Change Avatar</li>
          <li>Change Email</li>
          <li>Change Password</li>
          <li>Change Language</li>
          <h3>Credentials</h3>
          <label>
            Primary email:
            <input type="text" name="email" />
          </label>
          <br />
          <button>Add a new email address</button>
        </div>
        {/* {this.state.showPopup ? (
          <Popup text="Close Me" closePopup={this.togglePopup.bind(this)} />
        ) : null} */}
      </div>
    );
  }
}
