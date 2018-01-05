import React, { Component } from 'react';
import './KellySetting.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { fire as firebase } from '../fire';

import ImageUploader from 'react-images-upload';

import { connect } from 'react-redux';
import {
  updateDisplayNameField,
  updateEmailField,
  updateBioField,
  updateAvatarImage,
  sendNewDisplayName,
  sendNewEmailName,
  sendNewBio
} from '../../../../../ducks/reducers/userReducer';

class KellySetting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      avatarImage: [],
      newdisplayName: ''
    };

    this.handleImageChange = this.handleImageChange.bind(this);
    this.sendDisplayName = this.sendDisplayName.bind(this);
    this.sendNewEmailName = this.sendNewEmailName.bind(this);
    this.sendNewBio = this.sendNewBio.bind(this);
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

  //New user info functions
  sendDisplayName(e){
    e.preventDefault()
    this.props.sendNewDisplayName(this.props.user.newDisplayName)
  }

  sendNewEmailName(e){
    e.preventDefault()
    this.props.sendNewEmailName(this.props.user.newEmail)
  }

  sendNewBio(e){
    e.preventDefault()
    this.props.sendNewBio(this.props.user.newBio)
  }

  render() {
    console.log(this.props, 'kelly props')
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
        <div className="settings">
          <h3>Change Account Details:</h3>
          <hr />
          <div className="popup">
            <form>
              <div>
                <label className="changeForm">
                  Display Name:
                  <form onSubmit={this.sendDisplayName}>
                    <input
                      onChange={e => updateDisplayNameField(e.target.value)}
                      type="text"
                      name="name"
                      value={this.props.user.newDisplayName}
                    />
                  </form>
                  <br />
                </label>
                <br />
                <label className="changeForm">
                  
                  Email:
                  <form onSubmit={this.sendNewEmailName}>
                  <input
                    onChange={e => updateEmailField(e.target.value)}
                    type="text"
                    name="email"
                    value={this.props.user.newEmail}
                  />
                  </form>
                  <br />
                </label>
                <br />
                <label className="changeForm">
                  {' '}
                  Bio:
                  <form onSubmit={this.sendNewBio}>
                  <input
                    onChange={e => updateBioField(e.target.value)}
                    type="field"
                    name="bio"
                    value={this.props.user.newBio}
                  />{' '}
                  <br />
                  </form>
                </label>
                <br />
                <label className="changeForm">
                 Current Profile Pic:
                  <img
                    className='uploadButtonImg'
                    src={this.props.user.profilePicture}
                  />{' '}
                </label>
              </div>
            </form>
          </div>
          <div style={{position: 'relative'}}>
            
            <ImageUploader
              withIcon={false}
              buttonText="Upload New Avatar"
              buttonStyles={{width: '100px', height: '100px', 'border-radius': '50%', margin: '0'}}
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
              }}>
              save
            </button>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {

  return state;
}

export default connect(mapStateToProps, {
  updateDisplayNameField,
  updateEmailField,
  updateBioField,
  updateAvatarImage,
  sendNewDisplayName,
  sendNewEmailName,
  sendNewBio
})(KellySetting);
