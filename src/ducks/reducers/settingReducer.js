const axios = require('axios');

// State Variables
const initialState = {
  userIsLoggedIn: false,
  username: '',
  password: '',
  display_name: '',
  email: '',
  bio: ''
};
// Action type
const UPDATE_USERNAME_FIELD = 'UPDATE_USERNAME_FIELD';
const UPDATE_PASSWORD_FIELD = 'UPDATE_PASSWORD_FIELD';
const UPDATE_DISPLAY_NAME_FIELD = 'UPDATE_DISPLAY_NAME_FIELD';
const UPDATE_EMAIL_FIELD = 'UPDATE_EMAIL_FIELD';
const UPDATE_BIO_FIELD = 'UPDATE_BIO_FIELD';

// Reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USERNAME_FIELD:
      return { ...state, username: action.payload };
    case UPDATE_PASSWORD_FIELD:
      return { ...state, password: action.payload };
    case UPDATE_DISPLAY_NAME_FIELD:
      return { ...state, displayname: action.payload };
    case UPDATE_EMAIL_FIELD:
      return { ...state, email: action.payload };
    case UPDATE_BIO_FIELD:
      return { ...state, bio: action.payload };

    default:
      return state;
  }
}
// Actions
export function updateUserName(username) {
  return {
    type: 'UPDATE_USERNAME_FIELD',
    payload: username
  };
}

export function updatePasswordField(password) {
  return {
    type: 'UPDATE_PASSWORD_FIELD',
    payload: password
  };
}

export function updateDisplayNameField(displayName) {
  return {
    type: 'UPDATE_DISPLAY_NAME_FIELD',
    payload: displayName
  };
}

export function updateEmailField(email) {
  return {
    type: 'UPDATE_EMAIL_FIELD',
    payload: email
  };
}

export function updateBioField(bio) {
  return {
    type: 'UPDATE_BIO_FIELD',
    payload: bio
  };
}
export default reducer;
