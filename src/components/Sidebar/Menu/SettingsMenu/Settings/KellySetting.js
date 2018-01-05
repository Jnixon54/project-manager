import React, { Component } from 'react';
import './KellySetting.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { fire as firebase } from './fire';

import ImageUploader from 'react-images-upload';

import { connect } from 'react-redux';
import {
  updateUserName,
  updatePasswordField,
  updateDisplayNameField,
  updateEmailField,
  updateBioField,
  updateAvatarImage
} from '../../../../ducks/reducers/settingReducer';

class KellySetting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      avatarImage: [],
      newdisplayName: ''
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

  updateNewUserInfo(username, password, displayName, email, bio, imageURL) {
    axios
      .post('/api/updateUserInfo', {
        username,
        password,
        displayName,
        email,
        bio,
        imageURL
      })
      .then(response => this.setState({ newdisplayName: response.data }))
      .catch(console.log);
  }

  render() {
    const {
      updateUserName,
      updatePasswordField,
      updateDisplayNameField,
      updateEmailField,
      updateBioField,
      updateAvatarImage
    } = this.props;
    return (
      <div className="setting">
        <h3 className="links">Settings</h3>
        <br />
        <div className="settings">
          <h2>Change Account Details:</h2>
          <hr />
          <div className="popup">
            <form>
              <div className="changeForm">
                <label>
                  {' '}
                  Full Name:
                  <input
                    onChange={e => updateDisplayNameField(e.target.value)}
                    type="text"
                    name="name"
                  />
                  <br />
                </label>
                <br />
                <label>
                  {' '}
                  Username:{' '}
                  <input
                    onChange={e => updateUserName(e.target.value)}
                    type="text"
                    name="username"
                  />{' '}
                  <br />
                </label>
                <br />
                <label>
                  Password:<input
                    onChange={e => updatePasswordField(e.target.value)}
                    type="text"
                    name="password"
                  />{' '}
                  <br />
                </label>
                <br />
                <label>
                  {' '}
                  Email:<input
                    onChange={e => updateEmailField(e.target.value)}
                    type="text"
                    name="email"
                  />{' '}
                  <br />
                </label>
                <br />
                <label>
                  {' '}
                  Bio:{' '}
                  <input
                    onChange={e => updateBioField(e.target.value)}
                    type="text"
                    name="bio"
                  />{' '}
                  <br />
                </label>
                <br />
                <button
                  className="btn"
                  onClick={() =>
                    this.updateNewUserInfo(
                      this.props.username,
                      this.props.password,
                      this.props.display_name,
                      this.props.email,
                      this.props.bio,
                      this.props.imageUrl
                    )
                  }
                >
                  Save
                </button>
              </div>
            </form>
          </div>

          <br />
          <h3>
            Change Avatar:{' '}
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
          </h3>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const settings = state.settingReducer;
  return {
    userIsLoggedIn: settings.userIsLoggedIn,
    username: settings.username,
    password: settings.password,
    display_name: settings.display_name,
    email: settings.email,
    bio: settings.bio,
    imageUrl: settings.imageUrl
  };
}

export default connect(mapStateToProps, {
  updateUserName,
  updatePasswordField,
  updateDisplayNameField,
  updateEmailField,
  updateBioField,
  updateAvatarImage
})(KellySetting);
