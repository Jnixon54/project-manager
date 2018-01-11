const axios = require('axios');

// State Variables
const initialState = {
  usernameInput: 'asd',
  passwordInput: 'asd',
  userIsLoggedIn: false,
  userID: '',
  displayName: '',
  email: '',
  profilePicture: '',
  bio: '',
  //new settings changes
  newDisplayName: '',
  newEmail: '',
  newProfilePicture: '',
  newBio: ''
};

// Action type
const UPDATE_USER_INPUT_FIELD = 'UPDATE_USER_INPUT_FIELD';
const UPDATE_PASSWORD_INPUT_FIELD = 'UPDATE_PASSWORD_INPUT_FIELD';
const ON_SUBMIT_REGISTER = 'ON_SUBMIT_REGISTER';
const ON_SUBMIT_LOGIN = 'ON_SUBMIT_LOGIN';
const GET_USER_INFO = 'GET_USER_INFO';
const LOGOUT_USER = 'LOGOUT_USER';
// Settings action types
const UPDATE_DISPLAY_NAME_FIELD = 'UPDATE_DISPLAY_NAME_FIELD';
const UPDATE_EMAIL_FIELD = 'UPDATE_EMAIL_FIELD';
const UPDATE_BIO_FIELD = 'UPDATE_BIO_FIELD';
const UPDATE_IMAGE_URL = 'UPDATE_IMAGE_URL';
const SEND_NEW_DISPLAY_NAME = 'SEND_NEW_DISPLAY_NAME';
const SEND_NEW_EMAIL_NAME = 'SEND_NEW_EMAIL_NAME';
const SEND_NEW_BIO_NAME = 'SEND_NEW_BIO_NAME';

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
                        displayName: action.payload.display_name,
                        email: action.payload.email };
    case GET_USER_INFO + '_PENDING':
      return { ...state, loading: true };
    case GET_USER_INFO + '_FULFILLED':
      return {...state, displayName: action.payload.display_name, 
                        userID: action.payload.id, 
                        profilePicture: action.payload.image_url, 
                        email: action.payload.email, 
                        bio: action.payload.bio, 
                        //settings state
                        newDisplayName: action.payload.display_name,
                        newEmail: action.payload.email,
                        newProfilePicture: action.payload.image_url,
                        newBio: action.payload.bio,
                        loading: false};
     case ON_SUBMIT_LOGIN + '_PENDING':
       return { ...state };
     case ON_SUBMIT_LOGIN + '_FULFILLED':
      return {...state, usernameInput: '',};
    case LOGOUT_USER + '_PENDING':
        return {...state};
    case LOGOUT_USER + '_FULFILLED':
        return initialState;
    // case ON_SUBMIT_LOGIN:
    //   return { ...state, userIsLoggedIn: true };

    // Settings cases
      case UPDATE_DISPLAY_NAME_FIELD:
        return { ...state, newDisplayName: action.payload };
      case UPDATE_EMAIL_FIELD:
        return { ...state, newEmail: action.payload };
      case UPDATE_BIO_FIELD:
        return { ...state, newBio: action.payload };

      case UPDATE_IMAGE_URL:
        return { ...state, newProfilePicture: action.payload };

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
    .post('/register/', {
      username: username,
      password: password
    })
    .then(response => response)
  };
}

export function onSubmitLogin(username, password) {
  return {
    type: 'ON_SUBMIT_LOGIN',
    payload: axios
      .post('/auth/local', {
        username: username,
        password: password
      })
      .then(response => response.data)
    // payload: id
  };
}

export function getUserInfo() {
  return {
    type: 'GET_USER_INFO',
    payload: axios
      .get('/api/getUserInfo')
      .then(response => {
        return response.data[0];
      ;})
  };
}

export function logOut() {
  return {
    type: 'LOGOUT_USER',
    payload: axios
      .get('/logout')
      .then(response => {
      }).catch()
  }
}


//////////////////////////////////////////////
//settings component functions

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

export function updateAvatarImage(imageUrl) {
  return {
    type: 'UPDATE_IMAGE_URL',
    payload: imageUrl
  };
}

export function sendNewDisplayName(displayName){
  return {
    type: SEND_NEW_DISPLAY_NAME,
    payload: axios.put(`/api/sendNewDisplayName/${displayName}`)
  }
}

export function sendNewEmailName(email){
  return {
    type: SEND_NEW_EMAIL_NAME,
    payload: axios.put(`/api/sendNewEmailName/${email}`)
  }
}

export function sendNewBio(bio){
  return {
    type: SEND_NEW_BIO_NAME,
    payload: axios.put(`/api/sendNewBio/${bio}`)
  }
}

export default reducer;