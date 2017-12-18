// State Variables
const initialState = {
  
}

// Action type
const TEST_CASE = 'TEST_CASE';

// Reducer
function reducer(state = initialState, action){
  switch(action.type){
    case TEST_CASE:
      return {...state, socketID: action.socketID}
    default: return state;
  }
}

// Actions
export function setUserID(userID){
  return {
    type: 'TEST_CASE',
    userID
  }
}

export default reducer;