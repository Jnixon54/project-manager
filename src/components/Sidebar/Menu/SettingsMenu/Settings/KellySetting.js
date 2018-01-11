import React, { Component } from 'react';
import './KellySetting.css';
import { Link } from 'react-router-dom';
import {withRouter } from 'react-router';
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
  sendNewBio,
  logOut
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
    console.log(image, 'image');
    this.setState({
      avatarImage: this.state.avatarImage.concat(image)
    });
  }

  uploadImage(event) {
    console.log(event, 'event');
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
          <h3 id="settings-header">Change Account Details:</h3>
          <div className="popup">
              <div>
                <label className="changeForm">
                  <span className="settings-input-title ">Display Name:</span>
                  <form onSubmit={this.sendDisplayName}>
                    <input className="header-input" id="display-input"
                      onChange={e => updateDisplayNameField(e.target.value)}
                      type="text"
                      name="name"
                      value={this.props.user.newDisplayName ? this.props.user.newDisplayName : ''}
                    />
                  </form>
                </label>
                <br />
                <label className="changeForm">
                  
                  <span className="settings-input-title ">Email:</span>
                  <form onSubmit={this.sendNewEmailName}>
                  <input className="header-input" id="email-input"
                    onChange={e => updateEmailField(e.target.value)}
                    type="text"
                    name="email"
                    value={this.props.user.newEmail}
                  />
                  </form>
                </label>
                <br />
                <label className="changeForm">
                  {' '}
                  <span className="settings-input-title ">Bio:</span>
                  <form onSubmit={this.sendNewBio}>
                  <input className="header-input" id="bio-input"
                    onChange={e => updateBioField(e.target.value)}
                    type="field"
                    name="bio"
                    value={this.props.user.newBio}
                  />{' '}
                  <br />
                  </form>
                </label>
                <br />
                

                {/* <label className="changeForm">
                 Current Profile Pic:
                  <img
                    className='uploadButtonImg'
                    src={this.props.user.profilePicture}
                  />{' '}
                </label> */}
              </div>
            <div >
              <button className="logout-button" onClick={() => {logOut(); this.props.history.push('/');}}>
                Logout
              </button>
            </div>
          </div>
          {/* <div className="image-uploader" style={{position: 'relative'}}>
            
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
          </div> */}
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {

  return state;
}

export default withRouter(connect(mapStateToProps, {
  updateDisplayNameField,
  updateEmailField,
  updateBioField,
  updateAvatarImage,
  sendNewDisplayName,
  sendNewEmailName,
  sendNewBio,
  logOut
})(KellySetting));
