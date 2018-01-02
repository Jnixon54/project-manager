const axios = require('axios');

// State Variables
const initialState = {
  usernameInput: 'asd',
  passwordInput: 'asd',
  userIsLoggedIn: false,
  username: '',
  userID: '',
  display_name: '',
  email: ''
};

// Action type
const UPDATE_USER_INPUT_FIELD = 'UPDATE_USER_INPUT_FIELD';
const UPDATE_PASSWORD_INPUT_FIELD = 'UPDATE_PASSWORD_INPUT_FIELD';
const ON_SUBMIT_REGISTER = 'ON_SUBMIT_REGISTER';
const ON_SUBMIT_LOGIN = 'ON_SUBMIT_LOGIN';
// Reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USER_INPUT_FIELD:
      return { ...state, usernameInput: action.payload };
    case UPDATE_PASSWORD_INPUT_FIELD:
      return { ...state, passwordInput: action.payload };
    case ON_SUBMIT_REGISTER + '_PENDING':
      return { ...state };
    case ON_SUBMIT_REGISTER + '_FULFILLED':
      return {...state, usernameInput: '',
                        passwordInput: '',
                        username: action.payload.username,
                        userID: action.payload.id,
                        display_name: action.payload.display_name,
                        email: action.payload.email };
    case ON_SUBMIT_LOGIN + '_PENDING':
      return { ...state };
    case ON_SUBMIT_LOGIN + '_FULFILLED':
    console.log(action.payload)
      return {...state, usernameInput: '',
                        passwordInput: '',
                        username: action.payload.username,
                        userID: action.payload.id,
                        display_name: action.payload.display_name,
                        email: action.payload.email };
    // case ON_SUBMIT_LOGIN:
    //   return { ...state, userIsLoggedIn: true };
    default:
      return state;
  }
}

// Actions
export function updateUserInputField(username) {
  return {
    type: 'UPDATE_USER_INPUT_FIELD',
    payload: username
  };
}

export function updatePasswordInputField(password) {
  return {
    type: 'UPDATE_PASSWORD_INPUT_FIELD',
    payload: password
  };
}

export function onSubmitRegister(username, password) {
  return {
    type: 'ON_SUBMIT_REGISTER',
    payload: axios
    .post('http://localhost:3001/register/', {
      username: username,
      password: password
    })
    .then(response => response.data)
  };
}

export function onSubmitLogin(username, password) {
  return {
    type: 'ON_SUBMIT_LOGIN',
    payload: axios
      .post('http://localhost:3001/auth/local', {
        username: username,
        password: password
      })
      .then(response => response.data)
    // payload: id
  };
}

export default reducer;
