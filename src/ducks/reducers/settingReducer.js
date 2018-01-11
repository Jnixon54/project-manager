const axios = require('axios');

// State Variables
const initialState = {
  userIsLoggedIn: false,
  username: '',
  password: '',
  display_name: '',
  email: '',
  bio: '',
  imageUrl: ''
};
// Action type
const UPDATE_USERNAME_FIELD = 'UPDATE_USERNAME_FIELD';
const UPDATE_PASSWORD_FIELD = 'UPDATE_PASSWORD_FIELD';


// Reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USERNAME_FIELD:
      return { ...state, username: action.payload };
    case UPDATE_PASSWORD_FIELD:
      return { ...state, password: action.payload };
    

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

export default reducer