import axios from 'axios'

const initialState = {
  anItem: ['createProject', 'postNewItem'],
  newList: ['a project'],

  count: 0,

  newCard: '',
  cards: [],
  newTask: '',
  tasks: [],
  searchedUser: [],
  members: []
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

const INCREASE_COUNT = 'INCREASE_COUNT';
// const INCREASE_COUNT_CLIENT = 'INCREASE_COUNT_CLIENT';
const ALL_CARDS = 'ALL_CARDS'
const GET_CARDS = 'GET_CARDS'
//edit and delete tasks
const OPEN_TASKEDIT = 'OPEN_TASKEDIT'
const CHANGE_EDITTASK = 'CHANGE_EDITTASK'
const SEND_EDITTASK = 'SEND_EDITTASK'
const DELETE_TASK = 'DELETE_TASK'

const GET_TASKS = 'GET_TASKS'
const MEMBER_SEARCH = 'MEMBER_SEARCH'
const ADD_GROUP_MEMBER = 'ADD_GROUP_MEMBER'
const GROUP_MEMBERS = 'GROUP_MEMBER'





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
    payload: function () { }
  };
}


//adding cards
export function cardInput(e) {
  return {
    type: CARD_INPUT,
    payload: e.target.value
  }
}
export function addCard(card, projectID) {
  return {
    type: NEW_CARD,
    payload: axios.post('http://localhost:3001/api/newCard', { card, projectID }).then(res => {
      return res
    })
    // {cardHeader: res.data, tasks: []}
  }
}
export function getCards(projectID) {
  return {
    type: ALL_CARDS,
    payload: axios.get(`http://localhost:3001/api/getAllCards/${projectID}`).then(response => {

      console.log('data', response.data)
      return response.data
    })
  }
}
export function getCards2(projectID){
  return {
    type: GET_CARDS,
    payload: axios.get(`http://localhost:3001/api/getAllCards2/${projectID}`).then(response => {
      return response.data
    })
  }
}
export function getTasks(projectID){
  return {
    type: GET_TASKS,
    payload: axios.get(`http://localhost:3001/api/getAllTasks/${projectID}`).then(response => {
      console.log(response, 'tasks response')
      return response.data
    })
  }
}

//adding tasks
export function taskInput(e) {
  return {
    type: TASK_INPUT,
    payload: { name: e.target.name, value: e.target.value }
  }
}
export function addTask(task, cardID, projectID) {
  return {
    type: NEW_TASK,
    payload: axios.post('http://localhost:3001/api/newTask', { task, cardID, projectID }).then(res => {
      return res
    })
  }
}

export function openInput(input) {
  return {
    type: OPEN_INPUT,
    payload: input
  }
}

//editing tasks
export function openEditTask(taskID, task) {
  return {
    type: OPEN_TASKEDIT,
    payload: {taskID, task}
  }
}

export function changeEditTask(e){
  return {
    type: CHANGE_EDITTASK,
    payload: e.target.value
  }
}
export function sendEditTask(taskID, task){
  return {
    type: SEND_EDITTASK,
    payload: axios.post('http://localhost:3001/api/editTask', {taskID, task})
  }
}
export function deleteTask(taskID){
  return {
    type: DELETE_TASK,
    payload: axios.post('http://localhost:3001/api/deleteTask', {taskID})
  }
}
export function memberSearch(user){
    return {
      type: MEMBER_SEARCH,
      payload: axios.post('http://localhost:3001/api/memberSearch', {userName: user + '%'}).then(response => {
                return response.data;
      })
    }
}
export function addGroupMember(userId, projectId){
  return {
    type: ADD_GROUP_MEMBER,
    payload: axios.post('http://localhost:3001/api/addMember', {userId, projectId: parseInt(projectId)})
  }
}
export function groupMembers(projectId){
  return {
    type: GROUP_MEMBERS,
    payload: axios.get(`http://localhost:3001/api/groupMembers/${projectId}`).then(response => response.data)
  }
}






// export function increaseCount() {
//   return {
//     type: INCREASE_COUNT
//   }
// }

export function increaseCount(data) {
  if (data.processed) {
    return {
      type: INCREASE_COUNT,
      payload: data.count
    }
  } else {
    return {
      type: 'INCREASE_COUNT_SOCKET'
    }
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

    case GET_CARDS + '_PENDING':
      return Object.assign({}, state, { isLoading: true })
    case GET_CARDS + '_FULFILLED':
      return Object.assign({}, state, { cards: action.payload, newCard: '', isLoading: false })

    case ALL_CARDS + '_PENDING'://grabbing all cards from database
      return Object.assign({}, state, { isLoading: true })
    case ALL_CARDS + '_FULFILLED':
        let testVar = action.payload
        let finalArr = []
  
        function makeItWork(array) {
          let newArr = array
          let tasksArr = []
          let tasksObj = { task: '', taskID: '' }
  
          for (let i = 0; i < newArr.length; i++) {
            let obj = { cardHeader: '', tasks: [], cardID: '' }
  
            obj.cardHeader = newArr[i].title
            obj.cardID = newArr[i].id
            if (newArr[i].content !== null) {
              tasksObj.task = newArr[i].content
            }
            if (newArr[i].task_id !== null) {
              tasksObj.taskID = newArr[i].task_id
            }
            if (newArr[i + 1]) {
              if (obj.cardHeader !== newArr[i + 1].title) {
                tasksArr.push(tasksObj)
                tasksObj = { task: '', taskID: '' }
                obj.tasks = tasksArr
              }
              if (obj.cardHeader === newArr[i + 1].title) {
                tasksArr.push(tasksObj)
                tasksObj = { task: '', taskID: '' }
                continue;
              }
            }
            else {
              tasksArr.push(tasksObj)
            }
  
            obj.tasks = tasksArr.sort((a,b) => {return a.taskID - b.taskID})
            tasksArr = []
            finalArr.push(obj)
          }
          return finalArr
  
  
        }
        makeItWork(testVar)
        return Object.assign({}, state, { cards: finalArr, newCard: '', isLoading: false, newTask: '' });

    case CARD_INPUT://adding cards
      return Object.assign({}, state, { newCard: action.payload });



    case TASK_INPUT://adding tasks to cards
      return Object.assign({}, state, { newTask: action.payload.value, cardID: action.payload.name });
    case GET_TASKS + '_PENDING':
        return Object.assign({}, state, { isLoading: true});
    case GET_TASKS + '_FULFILLED':
        return Object.assign({}, state, { isLoading: false, tasks: action.payload});


    case OPEN_INPUT:
      return Object.assign({}, state, {inputOpen: action.payload});

    case OPEN_TASKEDIT:
      return Object.assign({}, state, {editTaskID: action.payload.taskID, editTaskTask: action.payload.task})
    case CHANGE_EDITTASK:
      return Object.assign({}, state, {editTaskTask: action.payload})


    case INCREASE_COUNT:
      return { ...state, count: action.payload }
   case MEMBER_SEARCH + '_FULFILLED':
      console.log('Member Search reducer', action.payload)
      return { ...state, searchedUser: action.payload, loading: false }
   case ADD_GROUP_MEMBER + '_FULFILLED':
      return { ...state, searchedUser:[] }
   case GROUP_MEMBERS + '_FULFILLED':
      return { ...state, members: action.payload }
    default:
      return state;
    //in case none of the action types match, it can return the state to make sure it don't break anything.
  }
}
