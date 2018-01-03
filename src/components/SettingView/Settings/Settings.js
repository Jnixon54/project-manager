import React, { Component } from 'react';
import '../SettingView.css';
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
} from '../../../ducks/reducers/settingReducer';

// import { Link } from 'react-router-dom';

class Settings extends Component {
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
      <div>
        <br />
        <div className="settings">
          <h3>Account Details:</h3>
          <Link to="/SettingView/Settings/Popup">
            <li>Change Name, Username, Password, email, or Bio...</li>
            <div className="popup">
              <form>
                <div className="changeForm">
                  <label>
                    {' '}
                    Full Name:{' '}
                    <input
                      onChange={e => updateDisplayNameField(e.target.value)}
                      type="text"
                      name="name"
                    />
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
                  </label>
                  <br />
                  <label>
                    Password:<input
                      onChange={e => updatePasswordField(e.target.value)}
                      type="text"
                      name="password"
                    />{' '}
                  </label>
                  <br />
                  <label>
                    {' '}
                    Email:<input
                      onChange={e => updateEmailField(e.target.value)}
                      type="text"
                      name="email"
                    />{' '}
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
                  </label>
                  <br />
                  <button
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
          </Link>
          <br />
          <li>
            Change Avatar:
            <ImageUploader
              withIcon={true}
              // buttonStyle={buttonStyles}
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
})(Settings);
