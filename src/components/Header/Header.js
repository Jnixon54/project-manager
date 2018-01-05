import React from 'react';
import './Header.css';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';

const Header = (props) => {
  return (
    <div className="header-container">
      <div>
        <span className="header-light">{props.path}</span> - <span className="header-bold">{props.currentPath}</span>
      </div>
      <div className="header-bold">{props.displayName}</div>
    </div>
)}

function mapStateToProps(state) {
  return {
    displayName: state.user.displayName
  }
}

export default withRouter(connect(mapStateToProps)(Header));