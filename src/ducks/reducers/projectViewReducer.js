const initialState = {
  anItem: ['createProject', 'postNewItem'],
  newList: ['a project'],


  newCard: '',
  cards: [],
  newTask: '',
  tasks: [],
  inputOpen: false
};



//actions: command given that is send to reducer & reducer uses it to figure out how the state should change.
const ADD_TO_LIST = 'ADD_TO_LIST';
const REMOVE_ITEM_FROM_LIST = 'REMOVE_ITEM_FROM_LIST';

//adding cards
const CARD_INPUT = 'CARD_INPUT'
const NEW_CARD = 'NEW_CARD'

//adding tasks
const TASK_INPUT = 'TASK_INPUT'
const NEW_TASK = 'NEW_TASK'

const OPEN_INPUT = 'OPEN_INPUT'





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


//adding cards
export function cardInput(e) {
  return{
    type: CARD_INPUT,
    payload: e.target.value
  }
}
export function addCard(card) {
  return {
    type: NEW_CARD,
    payload: {cardHeader: card, tasks: []}
  }
}

//adding tasks
export function taskInput(e){
  return{
    type: TASK_INPUT,
    payload: e.target.value
  }
}
export function addTask(task, index) {
  return {
    type: NEW_TASK,
    payload: {task, index}
  }
}



export function openInput(input) {
  return {
    type: OPEN_INPUT,
    payload: input
  }
}







// Reducer: state & action
export default function reducer(state = initialState, action) {
  switch (action.type) {

    case ADD_TO_LIST:
      return Object.assign({}, state, { items: action.payload });

    case REMOVE_ITEM_FROM_LIST:
      return Object.assign({}, state, { items: action.payload });

    //Spencer's additions\/


    case CARD_INPUT://adding cards
      return Object.assign({}, state, {newCard: action.payload});
    case NEW_CARD:
      return Object.assign({}, state, { cards: [...state.cards, action.payload] });

    case TASK_INPUT://adding tasks to cards
      return Object.assign({}, state, {newTask: action.payload});


    case NEW_TASK:
    let obj = state.cards
      function stuff(index, task){
        obj[index].tasks.push(task)
        return obj
      }
      stuff(action.payload.index, action.payload.task)
      
      return Object.assign({}, state, {cards: obj});



    case OPEN_INPUT:
      return Object.assign({}, state, {inputOpen: action.payload});




    default:
      return state;
      //in case none of the action types match, it can return the state to make sure it don't break anything.
  }
}
