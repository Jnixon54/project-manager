import React, { Component } from 'react';
import '../SettingView.css';

import ImageUploader from 'react-images-upload';

// import { Link } from 'react-router-dom';

export default class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      avatarImage: [],
      save: []
    };

    this.handleImageChange = this.handleImageChange.bind(this);
  }

  handleImageChange(image) {
    this.setState({
      avatarImage: this.state.avatarImage.concat(image)
    });
  }

  // saveImage() {
  //   this.setState({
  //     saveImage: this.state.saveImage
  //   });
  // }

  render() {
    const buttonStyles = {
      border: '5px solid pink',
      backgroundColor: 'yellow'
    };
    return (
      <div>
        <br />
        <div className="settings">
          <h3>Account Details:</h3>
          <li>Change Name, initial, or Bio...</li>
          <li>
            Change Avatar:
            <ImageUploader
              withIcon={true}
              buttonStyle={buttonStyles}
              buttonText="Upload an image"
              withPreview={true}
              withLabel={false}
              onChange={this.handleImageChange}
              imgExtension={['.jpg', '.gif', '.png', '.gif']}
              maxFileSize={5242880}
              fileSizeError="file size is too big"
            />
          </li>
          <li>Change Email</li>
          <li>Change Password</li>
          <li>Change Language</li>
        </div>
      </div>
    );
  }
}
