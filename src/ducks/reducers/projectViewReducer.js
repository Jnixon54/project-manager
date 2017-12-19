const initialState = {
  anItem: ['createProject', 'postNewItem'],
  newList: ['a project']
};

//actions: command given that is send to reducer & reducer uses it to figure out how the state should change.
const ADD_TO_LIST = ' ADD_TO_LIST ';
const REMOVE_ITEM_FROM_LIST = 'REMOVE_ITEM_FROM_LIST';

//ACTION CREATORS: creating a properly formatted action that has the right type in it.
export function addToList(newItem) {
  return {
    type: ADD_TO_LIST,
    payload: newItem
  };
}

export function removeFromList(newItem) {
  return {
    type: REMOVE_ITEM_FROM_LIST,
    payload: function() {}
  };
}

// Reducer: state & action
export default function reducer(state = initialState, action) {
  switch (action.type) {
    //This will handle add to list:
    case ADD_TO_LIST:
      return Object.assign({}, state, { items: action.payload });

    //This will handle remove from list:
    case REMOVE_ITEM_FROM_LIST:
      return Object.assign({}, state, { items: action.payload });

    default:
      //in case none of the action types match, it can return the state to make sure it don't break anything.
      return state;
  }
}
