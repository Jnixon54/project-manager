// State Variables
const initialState = {
  email: '',
  password: ''
};

// Action type
const TEST_CASE = 'TEST_CASE';
const UPDATE_EMAIL = 'UPDATE_EMAIL';
const UPDATE_PASSWORD = 'UPDATE_PASSWORD';

// Reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case TEST_CASE:
      return { ...state, socketID: action.socketID };
    case UPDATE_EMAIL:
      return { ...state, email: action.payload };
    case UPDATE_PASSWORD:
      return { ...state, password: action.payload };
    default:
      return state;
  }
}

// Actions
export function setUserID(userID) {
  return {
    type: 'TEST_CASE',
    userID
  };
}
export function setEmail(email) {
  return {
    type: 'UPDATE_EMAIL',
    email
  };
}
export function setPassword(password) {
  return {
    type: 'UPDATE_PASSWORD',
    password
  };
}

export default reducer;
