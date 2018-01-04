import axios from 'axios';

const initialState = {
  editHeaderID: 0,
  inputOpen: false,
  taskInputID: 0,
  newTask: ''
};

const EDIT_ER_ID = 'EDIT_ER_ID';
const HANDLE_ER = 'HANDLE_ER';
const UPDATE_NEW_ER = 'UPDATE_NEW_ER';
const DELETE_CARD = 'DELETE_CARD';
const DELETE_ALL_TASKS = 'DELETE_ALL_TASKS';
const SELECTED_TASK_INPUT = 'SELECTED_TASK_INPUT';

const TASK_INPUT = 'TASK_INPUT';
const NEW_TASK = 'NEW_TASK';
const CLEAR_NEW_TASK = 'CLEAR_NEW_TASK';

export function editCardHeader(cardID, title) {
  return {
    type: EDIT_ER_ID,
    payload: { cardID, title }
  };
}

export function handleHeader(value) {
  return {
    type: HANDLE_ER,
    payload: value
  };
}

export function updateHeader(newHeader, cardID) {
  return {
    type: UPDATE_NEW_ER,
    payload: axios
      .post('http://localhost:3001/api/updateHeader', { newHeader, cardID })
      .then(response => response)
  };
}

export function deleteCard(cardID) {
  return {
    type: DELETE_CARD,
    payload: axios
      .delete(`http://localhost:3001/api/deleteCard/${cardID}`)
      .then(response => response)
  };
}

export function deleteAllTasks(cardID) {
  return {
    type: DELETE_ALL_TASKS,
    payload: axios.delete(`http://localhost:3001/api/deleteAllTasks/${cardID}`)
  };
}

export function selectedTaskInput(cardID) {
  return {
    type: SELECTED_TASK_INPUT,
    payload: cardID
  };
}
export function taskInput(e) {
  return {
    type: TASK_INPUT,
    payload: { name: e.target.name, value: e.target.value }
  };
}
export function addTask(task, cardID, projectID) {
  return {
    type: NEW_TASK,
    payload: axios
      .post('http://localhost:3001/api/newTask', { task, cardID, projectID })
      .then(res => {
        return res;
      })
  };
}

export function clearNewTask() {
  return {
    type: CLEAR_NEW_TASK,
    payload: 'nothing'
  };
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case EDIT_ER_ID:
      return Object.assign({}, state, {
        editHeaderID: action.payload.cardID,
        header: action.payload.title
      });
    case HANDLE_ER:
      return Object.assign({}, state, { header: action.payload });
    case SELECTED_TASK_INPUT:
      return Object.assign({}, state, { taskInputID: action.payload });

    case TASK_INPUT: //adding tasks to cards
      return Object.assign({}, state, {
        newTask: action.payload.value,
        cardID: action.payload.name
      });

    case CLEAR_NEW_TASK:
      return Object.assign({}, state, { newTask: '', cardID: 0 });
    default:
      return state;
  }
}
