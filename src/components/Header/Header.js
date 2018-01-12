import React from 'react';
import './Header.css';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';

const BackButton = (props) => {
  return (
    <div className="back-button" onClick={props.goBack}>
      <div className="back-1"></div>
      <div className="back-2"></div>
      <div className="back-3"></div>
    </div>
  )
}

const Header = (props) => {
  return (
    <div className="header-container">
      { props.path == 'Board' ? <BackButton goBack={props.history.goBack} /> : null}
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