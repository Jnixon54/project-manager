import React, { Component } from 'react';
import '../SettingView.css';
// import Popup from '../../Popup/Popup';
import { Link } from 'react-router-dom';

import { fire as firebase } from './fire';

import ImageUploader from 'react-images-upload';

// import { Link } from 'react-router-dom';

export default class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      avatarImage: []
      // save: []
    };

    this.handleImageChange = this.handleImageChange.bind(this);
  }

  handleImageChange(image) {
    console.log(image);
    this.setState({
      avatarImage: this.state.avatarImage.concat(image)
    });
  }

  uploadImage(event) {
    console.log(event);
    // event.preventDefault();
    let file = event[0][0];
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef
      .child('profilePictures/' + file.name)
      .put(file);
    uploadTask.on(
      'state_changed',
      snapshot => {},
      function(error) {},
      function() {
        console.log(uploadTask.snapshot.downloadURL);
        // that.setState({ downloadURL: uploadTask.snapshot.downloadURL });
        // console.log(this.state.downloadURL);
      }
    );
  }

  render() {
  
    return (
      <div>
        <br />
        <div className="settings">
          <h3>Account Details:</h3>
          <Link to="/SettingView/Settings/Popup">
            <li>Change Name, Username, Password, email, or Bio...</li>{' '}
            {this.props.children}
          </Link>
          <br />
          <li>
            Change Avatar:
            <ImageUploader
              withIcon={true}
              buttonText="Upload an image"
              withPreview={true}
              withLabel={false}
              onChange={this.handleImageChange}
              imgExtension={['.jpg', '.gif', '.png', '.gif']}
              maxFileSize={5242880}
              fileSizeError="file size is too big"
            />
            <button
              onClick={() => {
                this.uploadImage(this.state.avatarImage);
              }}
            >
              save
            </button>
          </li>
        </div>
        {/* {this.state.showPopup ? (
          <Popup text="Close Me" closePopup={this.togglePopup.bind(this)} />
        ) : null} */}
      </div>
    );
  }
}
