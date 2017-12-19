const initialState = {
  anItem: ['createProject', 'postNewItem'],
  newList: ''
};

//actions: command given that is send to reducer & reducer uses it to figure out how the state should change.
const ADD_TO_LIST = ' ADD_TO_LIST ';
const REMOVE_ITEM_FROM_LIST = 'REMOVE_ITEM_FROM_LIST';

// Reducer: state & action
export default function reducer(state, action) {
  switch (action.type) {
    //This will handle add to list:
    case ADD_TO_LIST:
      var newState = {};
      var newListItem = action.payload;
      var newList = [...state.items, newListItem]; //take the spread operation & combine them with items. This will create an array that has all the values from state.items as my newListItem

      return {
        items: newList //returning my new state
      };

    //This will handle remove from list:
    case REMOVE_ITEM_FROM_LIST:
      var newState = {};
      var targetItem = action.payload;
      var newList = [...state.items];

      newList.splice(newList.indexOf(targetItem), 1); //cut out of new list and remove it from the list

      return {
        items: newList
      };
    default:
      //in case none of the action types match, it can return the state to make sure it don't break anything.
      return state;
  }
}
//ACTION CREATORS: creating a properly formatted action that has the right type in it.
export function addToList(newItem) {
  return {
    type: ADD_TO_LIST,
    payload: newItem
  };
}
