// State Variables
const initialState = {
  roomID: ''
};

// Action type
const JOIN_ROOM = 'JOIN_ROOM';

// Reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case JOIN_ROOM:
      return { ...state, socketID: action.payloadD };
    default:
      return state;
  }
}

// Actions
export function joinRoom(data) { // data will contain the roomID based off project ID
    return {
      type: 'JOIN_ROOM',
      payload: data.roomID
  }
}

export default reducer;
