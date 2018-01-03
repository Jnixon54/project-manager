const axios = require('axios');

const initialState = {
  projects: [],
  tasks: [],
  loading: false,
  newProjectTitle: ''
};

// Action Types
const GET_PROJECTS = 'GET_PROJECTS';
const GET_TASKS = 'GET_TASKS';
const UPDATE_NEWPROJECTTITLE = 'UPDATE_NEWPROJECTTITLE';

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_PROJECTS + '_PENDING':
      return Object.assign({}, state, { loading: true });
    case GET_PROJECTS + '_FULFILLED':
      return Object.assign({}, state, {
        loading: false,
        projects: action.payload
      });

    case GET_TASKS + '_PENDING':
      return Object.assign({}, state, { loading: true });
    case GET_TASKS + '_FULFILLED':
      return Object.assign({}, state, {
        loading: false,
        tasks: action.payload
      });
    //Adds project title to database from create new project
    case UPDATE_NEWPROJECTTITLE:
      return Object.assign({}, state, {
        newProjectTitle: action.payload
      });
    default:
      return state;
  }
}

// Action Creators

export function getAllProjects(userID) {
  return {
    type: GET_PROJECTS,
    payload: axios
      .post('http://localhost:3001/api/allProjects', { id: userID })
      .then(response => response.data)
  };
}

export function getAllTasks(userID) {
  return {
    type: GET_TASKS,
    payload: axios
      .post('http://localhost:3001/api/allTasks', { id: userID })
      .then(response => response.data)
  };
}

export function updateNewProjectTitle(e) {
  return {
    type: UPDATE_NEWPROJECTTITLE,
    payload: e.target.value
  };
}
